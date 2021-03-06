import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const ContextSection = () => (
  <div className="context-section-container">
    <div className="tabs-section">
      <div className="context-name-container active-tab">
        <AiFillHome className="context-icons active-icon" />
        <Link to="/" className="link-item">
          <p className="context-name">Home</p>
        </Link>
      </div>

      <Link to="/trending" className="link-item">
        <div className="context-name-container">
          <HiFire className="context-icons " />
          <p className="context-name">Trending</p>
        </div>
      </Link>
      <Link to="/gaming" className="link-item">
        <div className="context-name-container ">
          <SiYoutubegaming className="context-icons " />
          <p className="context-name">Gaming</p>
        </div>
      </Link>
      <Link to="/saved-videos" className="link-item">
        <div className="context-name-container ">
          <CgPlayListAdd className="context-icons " />
          <p className="context-name">Saved videos</p>
        </div>
      </Link>
    </div>
    <div className="contact-us-section">
      <p className="contact-us-heading">CONTACT US</p>
      <div className="logos-container">
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
      <p className="message">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)

export default ContextSection
