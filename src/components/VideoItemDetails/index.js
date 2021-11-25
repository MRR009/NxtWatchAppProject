import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'

import Header from '../Header'
import ContextSection from '../ContextSection'
// import VideoItemCard from '../VideoItemCard'

import SavedVideosContext from '../../context/SavedVideosContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetailsList: {},
    apiStatus: apiStatusConstants.initial,
    channelDetails: {},
    like: false,
    disLike: false,
    videoSaved: false,
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

  getVideosDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const videoDetails = fetchedData.video_details
      const updatedVideoDetails = {
        channel: videoDetails.channel,
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
      const channelDetails = updatedVideoDetails.channel
      // console.log(updatedVideoDetails)
      const updatedChannelDetails = {
        name: channelDetails.name,
        profileImageUrl: channelDetails.profile_image_url,
        subscriberCount: channelDetails.subscriber_count,
      }
      // console.log(updatedChannelDetails)
      this.setState({
        videoDetailsList: {...updatedVideoDetails},
        apiStatus: apiStatusConstants.success,
        channelDetails: {...updatedChannelDetails},
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
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
      <Loader
        data-testid="loader"
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderVideoItemView = () => (
    <SavedVideosContext.Consumer>
      {value => {
        const {
          videoDetailsList,
          channelDetails,
          like,
          disLike,
          videoSaved,
        } = this.state
        // console.log(videoDetailsList)
        const {addSavedVideo} = value
        const {
          title,
          description,
          publishedAt,
          videoUrl,
          viewCount,
        } = videoDetailsList
        const {name, profileImageUrl, subscriberCount} = channelDetails
        const resolvedDat = formatDistanceToNow(new Date(publishedAt))
        let prevClass = ''
        const getDuration = resolvedDate => {
          let res = ''
          let result = ''
          if (resolvedDate.includes('almost')) {
            // console.log(resolvedDate.includes('almost'))
            result = resolvedDate.replace('almost', '')
          } else if (resolvedDate.includes('about')) {
            result = resolvedDate.replace('about', '')
          } else if (resolvedDate.includes('over')) {
            res = resolvedDate.replace('over', '')
            result = `${res} ago`
          } else {
            result = resolvedDate
          }

          return result
        }

        const toggleSavedButton = () => {
          // console.log(option)
          this.setState(prevState => ({videoSaved: !prevState.videoSaved}))
        }

        const toggleLikeVideo = () => {
          if (disLike === true) {
            this.setState({disLike: false})
            this.setState({like: true})
          } else {
            this.setState({like: !like})
          }
        }

        const toggleDislikeVideo = () => {
          if (like === true) {
            console.log(prevClass)
            this.setState({like: false})
            this.setState({disLike: true})
          } else {
            prevClass = 'prev-liked'
            this.setState({disLike: !disLike})
          }
        }

        const onClickSaveVideo = () => {
          // console.log(videoSaved)
          addSavedVideo({...videoDetailsList})
        }

        return (
          <>
            <div className="video-player-container">
              <div className="responsive-container">
                <ReactPlayer url={videoUrl} controls />
              </div>
              <p className="video-title">{title}</p>
              <div className="middle-bar-container">
                <div className="views-container">
                  <p className="views-count">{viewCount} Views</p>
                  <p className="date-duration">{getDuration(resolvedDat)}</p>
                </div>
                <div className="like-dislike-container">
                  {like ? (
                    <button
                      type="button"
                      className="like-button"
                      onClick={toggleLikeVideo}
                    >
                      <AiFillLike className="toggled-icon" />
                      <p className="toggled-icon-text">Like</p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-button"
                      onClick={toggleLikeVideo}
                    >
                      <AiOutlineLike className={`icon ${prevClass}`} />
                      <p className="icon-text">Like</p>
                    </button>
                  )}

                  {disLike ? (
                    <button
                      type="button"
                      className="like-button"
                      onClick={toggleDislikeVideo}
                    >
                      <AiFillDislike className="toggled-icon" />
                      <p className="toggled-icon-text">Dislike</p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-button"
                      onClick={toggleDislikeVideo}
                    >
                      <AiOutlineDislike className="icon" />
                      <p className="icon-text">Dislike</p>
                    </button>
                  )}

                  {videoSaved ? (
                    <button
                      type="button"
                      className="like-button"
                      onClick={onClickSaveVideo}
                    >
                      <CgPlayListAdd
                        className="toggled-icon"
                        onClick={toggleSavedButton}
                      />
                      <p
                        className="toggled-icon-text"
                        onClick={toggleSavedButton}
                      >
                        Save
                      </p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-button"
                      onClick={onClickSaveVideo}
                    >
                      <CgPlayListAdd className="icon" />
                      <p className="icon-text">Save</p>
                    </button>
                  )}
                </div>
              </div>
              <hr />
              <div className="video-description-channel-container">
                <img
                  src={profileImageUrl}
                  className="channel-image"
                  alt="channel logo"
                />
                <div className="video-details-container">
                  <p className="video-channel-name">{name}</p>
                  <p className="channel-subscribers">
                    {subscriberCount} subscribers
                  </p>
                  <p className="video-description">{description}</p>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  renderViewDisplay = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="video-item-container">
          <ContextSection />
          {this.renderViewDisplay()}
        </div>
      </>
    )
  }
}

export default VideoItemDetails
