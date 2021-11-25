import {Link, withRouter} from 'react-router-dom'
// import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut, FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import './index.css'
import 'reactjs-popup/dist/index.css'

const DarkHeader = props => {
  const {toggleThemeButton} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="dark-nav-header">
      <div className="dark-nav-content">
        <div className="dark-nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="dark-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="website logo"
            />
          </Link>

          <div className="dark-nav-icons-container">
            <button
              className="dark-theme-button"
              type="button"
              data-testid="theme"
              onClick={() => toggleThemeButton()}
            >
              <FiSun className="dark-icon-mobile" />
            </button>
            <GiHamburgerMenu className="dark-icon-mobile" />
            <Popup
              modal
              trigger={
                <button type="button" className="dark-nav-mobile-btn">
                  <FiLogOut className="dark-icon-mobile" />
                </button>
              }
              className="dark-popup-content"
            >
              {close => (
                <div className="dark-popup-context">
                  <p className="dark-logout-message">
                    Are you sure, you want to logout
                  </p>
                  <div className="dark-confirm-cancel-btn-container">
                    <button
                      type="button"
                      className="dark-cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="dark-confirm-btn"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>

        <div className="dark-nav-bar-large-container">
          <Link to="/">
            <img
              className="dark-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="dark-nav-menu">
            <li className="dark-nav-menu-item">
              <button
                onClick={() => toggleThemeButton()}
                className="dark-theme-button"
                type="button"
                data-testid="theme"
              >
                <FiSun className="dark-theme-icon" />
              </button>
            </li>

            <li className="dark-nav-menu-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="dark-profile-image"
              />
            </li>
          </ul>
          <Popup
            modal
            trigger={
              <button
                type="button"
                className="dark-logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            }
            className="dark-popup-content"
          >
            {close => (
              <div className="dark-popup-context">
                <p className="dark-logout-message">
                  Are you sure, you want to logout
                </p>
                <div className="dark-confirm-cancel-btn-container">
                  <button
                    type="button"
                    className="dark-cancel-btn"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="dark-confirm-btn"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
      <div className="dark-nav-menu-mobile">
        <ul className="dark-nav-menu-list-mobile">
          <li className="dark-nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-image"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="dark-nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="dark-nav-bar-image"
              />
            </Link>
          </li>
          <li className="dark-nav-menu-item-mobile">
            <div className="dark-nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="dark-nav-bar-image"
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(DarkHeader)

/** src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout" */
