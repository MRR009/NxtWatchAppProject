import {Component} from 'react'
import SavedVideosContext from '../../context/SavedVideosContext'

import './index.css'

import Header from '../Header'
import ContextSection from '../ContextSection'
import DarkHeader from '../DarkThemeHeader'
import DarkContextSection from '../DarkThemeContextSection'
import SavedVideoCard from '../SavedVideosCard'
import NoSavedVideosView from '../NoSavedVideos'

class SavedVideos extends Component {
  state = {darkTheme: false}

  toggleThemeButton = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideoList} = value
          const {darkTheme} = this.state
          // console.log(savedVideoList)
          // console.log(savedVideoList.length)
          const showNoSavedVideos = savedVideoList.length === 0
          return darkTheme ? (
            <>
              <DarkHeader toggleThemeButton={this.toggleThemeButton} />
              <div className="saved-video-section-container">
                <DarkContextSection />
                <h1>Saved Videos</h1>
                {showNoSavedVideos ? (
                  <NoSavedVideosView />
                ) : (
                  <ul>
                    {savedVideoList.map(eachVideo => (
                      <SavedVideoCard
                        eachVideo={eachVideo}
                        key={eachVideo.id}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Header toggleThemeButton={this.toggleThemeButton} />
              <div className="saved-video-section-container">
                <ContextSection />
                <h1>Saved Videos</h1>
                {showNoSavedVideos ? (
                  <NoSavedVideosView />
                ) : (
                  <ul>
                    {savedVideoList.map(eachVideo => (
                      <SavedVideoCard
                        eachVideo={eachVideo}
                        key={eachVideo.id}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default SavedVideos
