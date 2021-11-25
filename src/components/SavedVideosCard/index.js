import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const SavedVideoCard = props => {
  const {eachVideo} = props

  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = eachVideo

  const resolvedDat = formatDistanceToNow(new Date(publishedAt))
  // console.log(publishedAt)
  // console.log(resolvedDat)
  // console.log(listLength)
  const getDuration = resolvedDate => {
    let res = ''
    let result = ''
    if (resolvedDate.includes('almost')) {
      // console.log(resolvedDate.includes('almost'))
      res = resolvedDate.replace('almost', '')
    } else if (resolvedDate.includes('about')) {
      res = resolvedDate.replace('about', '')
    } else if (resolvedDate.includes('over')) {
      result = resolvedDate.replace('over', '')
      res = `${result} ago`
    } else {
      res = resolvedDate
    }

    return res
  }
  // console.log(getDuration(resolvedDat))
  // console.log(publishedAt.slice(0, 3))
  // console.log(savedVideoList.length)

  return (
    <>
      <Link to={`/videos/${id}`} className="saved-link-item">
        <img
          src={thumbnailUrl}
          className="saved-thumbnail-image"
          alt="video thumbnail"
        />
        <div className="saved-video-details">
          <img
            src={channel.profile_image_url}
            className="saved-profile-image"
            alt="channel logo"
          />
          <div className="saved-video-content-details">
            <p className="saved-video-title">{title}</p>
            <p className="saved-video-channel-name">{channel.name}</p>
            <div className="saved-views-date-container">
              <p className="saved-views-container">{viewCount} Views</p>
              <p className="saved-date-duration">{getDuration(resolvedDat)}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SavedVideoCard

/** 
    listLength === 0 ? (
          <div className="no-saved-containers">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="no-saved-image"
            />
            <h1 className="no-saved-heading">No saved videos found</h1>
            <p className="no-saved-message">
              You can save your videos while watching them
            </p>
          </div>
        ) : (
 */
