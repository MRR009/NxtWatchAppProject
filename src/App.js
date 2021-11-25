import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import SavedVideosContext from './context/SavedVideosContext'

import './App.css'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/TrendingRoute'
import Gaming from './components/GamingRoute'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {savedVideoList: []}

  addSavedVideo = video => {
    this.setState(prevState => ({
      savedVideoList: [...prevState.savedVideoList, video],
    }))
  }

  deleteSavedVideo = video => {
    const {savedVideoList} = this.state
    const videoIndex = savedVideoList.findIndex(i => i.id === video.id)
    const updatedVideoList = savedVideoList.slice(videoIndex, videoIndex + 1)
    this.setState({
      savedVideoList: [...updatedVideoList],
    })
  }

  render() {
    const {savedVideoList} = this.state

    return (
      <SavedVideosContext.Provider
        value={{
          savedVideoList,
          addSavedVideo: this.addSavedVideo,
          deleteSavedVideo: this.deleteSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
