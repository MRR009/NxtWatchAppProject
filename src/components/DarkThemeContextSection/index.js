import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const DarkContextSection = () => (
  <div className="dark-context-section-container">
    <div className="dark-tabs-section">
      <Link to="/" className="link-item">
        <div className="dark-context-name-container dark-active-tab">
          <AiFillHome className="dark-context-icons dark-active-icon" />
          <p className="dark-context-name">Home</p>
        </div>
      </Link>

      <Link to="/trending" className="link-item">
        <div className="dark-context-name-container">
          <HiFire className="dark-context-icons " />
          <p className="dark-context-name">Trending</p>
        </div>
      </Link>
      <Link to="/gaming" className="link-item">
        <div className="dark-context-name-container ">
          <SiYoutubegaming className="dark-context-icons " />
          <p className="dark-context-name">Gaming</p>
        </div>
      </Link>
      <Link to="/saved-videos" className="link-item">
        <div className="dark-context-name-container ">
          <CgPlayListAdd className="dark-context-icons " />
          <p className="dark-context-name">Saved videos</p>
        </div>
      </Link>
    </div>
    <div className="dark-contact-us-section">
      <p className="dark-contact-us-heading">CONTACT US</p>
      <div className="dark-logos-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          className="contact-us-logo"
          alt="facebook logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          className="contact-us-logo"
          alt="twitter logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          className="contact-us-logo"
          alt="linked in logo"
        />
      </div>
      <p className="dark-message">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)

export default DarkContextSection
