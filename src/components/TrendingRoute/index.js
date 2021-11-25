import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ContextSection from '../ContextSection'
import TrendingTab from '../TrendingTab'
import DarkHeader from '../DarkThemeHeader'
import DarkContextSection from '../DarkThemeContextSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    apiStatus: apiStatusConstants.initial,
    channelDetails: [],
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
    const jwtToken = Cookies.get('jwt_token')
    // const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all?search='
    const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    // const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(trendingVideosApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedTrendingVideos = fetchedData.videos.map(video =>
        this.convertVideosDetails(video),
      )
      const updatedChannelDetails = updatedTrendingVideos.map(video =>
        this.convertChannelDetails(video.channel),
      )
      // console.log(updatedChannelDetails)

      this.setState({
        trendingVideosList: [...updatedTrendingVideos],
        apiStatus: apiStatusConstants.success,
        channelDetails: [...updatedChannelDetails],
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  toggleThemeButton = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  onClickRetryButton = () => {
    this.getVideosDetails()
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
        onClick={this.onClickRetryButton}
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

  renderTrendingTab = () => {
    const {trendingVideosList, channelDetails, darkTheme} = this.state
    // console.log(homeVideosList)
    return (
      <TrendingTab
        trendingVideosList={trendingVideosList}
        channelDetails={channelDetails}
        darkTheme={darkTheme}
      />
    )
  }

  renderViewDisplay = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingTab()
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

export default Trending
