import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {RiCloseLine} from 'react-icons/ri'

import Header from '../Header'
import DarkHeader from '../DarkThemeHeader'
import ContextSection from '../ContextSection'
import DarkContextSection from '../DarkThemeContextSection'
import HomeTab from '../HomeTab'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeVideosList: [],
    apiStatus: apiStatusConstants.initial,
    channelDetails: [],
    searchInput: '',
    bannerVisible: true,
    darkTheme: false,
  }

  componentDidMount() {
    this.getVideosDetails()
  }

  convertVideosDetails = video => ({
    channel: video.channel,
    id: video.id,
    publishedAt: video.published_at,
    thumbnailUrl: video.thumbnail_url,
    title: video.title,
    viewCount: video.view_count,
  })

  convertChannelDetails = chann => ({
    name: chann.name,
    profileImageUrl: chann.profile_image_url,
  })

  getVideosDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    // const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    // const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedHomeVideos = fetchedData.videos.map(video =>
        this.convertVideosDetails(video),
      )
      const updatedChannelDetails = updatedHomeVideos.map(video =>
        this.convertChannelDetails(video.channel),
      )
      // console.log(updatedChannelDetails)

      this.setState({
        homeVideosList: [...updatedHomeVideos],
        apiStatus: apiStatusConstants.success,
        channelDetails: [...updatedChannelDetails],
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getVideosDetails()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  closeBanner = () => this.setState({bannerVisible: false})

  onClickRetryButton = () => {
    this.setState({searchInput: ''}, this.getVideosDetails)
  }

  onClickFailureRetryButton = () => {
    this.getVideosDetails()
  }

  toggleThemeButton = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.changeSearchInput}
          onKeyDown={this.enterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderBannerSection = () => {
    const {bannerVisible} = this.state

    return bannerVisible ? (
      <div data-testid="banner" className="home-top-section">
        <div className="home-premium-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p className="buy-message">Buy Nxt Watch Premium</p>
          <button type="button" className="get-it-now-button">
            GET IT NOW
          </button>
        </div>
        <button
          type="button"
          data-testid="close"
          className="close-button"
          onClick={this.closeBanner}
        >
          <RiCloseLine size={20} color="#231f20" />
        </button>
      </div>
    ) : null
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickFailureRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomeTab = () => {
    const {homeVideosList, channelDetails} = this.state
    // console.log(homeVideosList)
    return homeVideosList.length === 0 ? (
      <div className="no-search-results-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-search-results-image"
        />
        <h1 className="no-search-heading">No Search results found</h1>
        <p className="no-search-description">
          Try different key words or remove search filter
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    ) : (
      <div className="home-tab-container">
        {this.renderBannerSection()}
        {this.renderSearchInput()}
        <HomeTab
          homeVideosList={homeVideosList}
          channelDetails={channelDetails}
        />
      </div>
    )
  }

  renderViewDisplay = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeTab()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {darkTheme} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return darkTheme ? (
      <>
        <DarkHeader toggleThemeButton={this.toggleThemeButton} />
        <div className="home-container">
          <DarkContextSection />
          {this.renderViewDisplay()}
        </div>
      </>
    ) : (
      <>
        <Header toggleThemeButton={this.toggleThemeButton} />
        <div className="home-container">
          <ContextSection />
          {this.renderViewDisplay()}
        </div>
      </>
    )
  }
}

export default Home
