import './index.css'

import ContextSection from '../ContextSection'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found">
      <ContextSection />
      <div className="not-found-responsive">
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
            className="not-found-img"
          />
          <h1 className="not-found-heading">Page Not Found </h1>
          <p className="not-found-message">
            we are sorry, the page you requested could not be found.
          </p>
        </div>
      </div>
    </div>
  </>
)

export default NotFound
