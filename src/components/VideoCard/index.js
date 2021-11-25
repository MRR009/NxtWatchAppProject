import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const VideoCard = props => {
  const {eachVideo} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = eachVideo
  const resolvedDat = formatDistanceToNow(new Date(publishedAt))
  // console.log(publishedAt)
  // console.log(resolvedDat)
  const getDuration = resolvedDate => {
    let res = ''
    if (resolvedDate.includes('almost')) {
      // console.log(resolvedDate.includes('almost'))
      res = resolvedDate.replace('almost', '')
    } else if (resolvedDate.includes('about')) {
      res = resolvedDate.replace('about', '')
    } else if (resolvedDate.includes('over')) {
      res = resolvedDate.replace('over', '')
    } else {
      res = resolvedDate
    }

    return res
  }
  // console.log(getDuration(resolvedDat))
  // console.log(publishedAt.slice(0, 3))
  return (
    <Link to={`/videos/${id}`} className="link-item">
      <img
        src={thumbnailUrl}
        className="thumbnail-image"
        alt="video thumbnail"
      />
      <div className="video-details">
        <img
          src={channel.profile_image_url}
          className="profile-image"
          alt="channel logo"
        />
        <div className="video-content-details">
          <p className="video-title">{title}</p>
          <p className="video-channel-name">{channel.name}</p>
          <div className="views-date-container">
            <p className="views-container">{viewCount} Views</p>
            <p className="date-duration">{getDuration(resolvedDat)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
