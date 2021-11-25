import './index.css'

const NoSavedVideosView = () => (
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
)

export default NoSavedVideosView
