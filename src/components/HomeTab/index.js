// import {Link} from 'react-router-dom'

import './index.css'
import VideoCard from '../VideoCard'

const HomeTab = props => {
  const {homeVideosList} = props
  // console.log(homeVideosList)

  return (
    <ul className="home-content">
      {homeVideosList.map(eachVideo => (
        <li className="video-card-container" key={eachVideo.id}>
          <VideoCard eachVideo={eachVideo} />
        </li>
      ))}
    </ul>
  )
}

export default HomeTab

/**
 */
