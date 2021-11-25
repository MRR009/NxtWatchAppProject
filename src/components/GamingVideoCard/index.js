import {Link} from 'react-router-dom'

import './index.css'

const GamingVideoCard = props => {
  const {eachVideo} = props
  const {thumbnailUrl, id, title, viewCount} = eachVideo

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <img
        src={thumbnailUrl}
        className="gaming-thumbnail-image"
        alt="video thumbnail"
      />

      <div className="gaming-video-content-details">
        <p className="gaming-video-title">{title}</p>
        <p className="gaming-views-container">{viewCount} Watching Worldwide</p>
      </div>
    </Link>
  )
}

export default GamingVideoCard
