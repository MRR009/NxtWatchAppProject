import './index.css'
import VideoCard from '../VideoCard'

import {TrendingTabContainer} from './styledComponents'

const TrendingTab = props => {
  const {trendingVideosList, darkTheme} = props
  // console.log(trendingVideosList)

  return darkTheme ? (
    <TrendingTabContainer data-testid="savedVideos">
      <h1 className="dark-trending-heading">Trending</h1>
      <ul className="trending-content">
        {trendingVideosList.map(eachVideo => (
          <li className="video-card-container" key={eachVideo.id}>
            <VideoCard eachVideo={eachVideo} />
          </li>
        ))}
      </ul>
    </TrendingTabContainer>
  ) : (
    <>
      <h1 className="trending-heading">Trending</h1>
      <ul className="trending-content">
        {trendingVideosList.map(eachVideo => (
          <li className="video-card-container" key={eachVideo.id}>
            <VideoCard eachVideo={eachVideo} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default TrendingTab
