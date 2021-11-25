import './index.css'
import GamingVideoCard from '../GamingVideoCard'

const GamingTab = props => {
  const {gamingVideosList} = props
  // console.log(gamingVideosList)

  return (
    <>
      <h1>Gaming</h1>
      <ul className="gaming-content">
        {gamingVideosList.map(eachVideo => (
          <li className="video-card-container" key={eachVideo.id}>
            <GamingVideoCard eachVideo={eachVideo} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default GamingTab
