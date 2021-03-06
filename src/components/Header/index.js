import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import './index.css'
import 'reactjs-popup/dist/index.css'

const Header = props => {
  const {toggleThemeButton} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>

          <div className="nav-icons-container">
            <button
              onClick={() => toggleThemeButton()}
              className="theme-button"
              type="button"
              data-testid="theme"
            >
              <FaMoon className="icon-mobile" />
            </button>
            <GiHamburgerMenu className="icon-mobile" />
            <Popup
              modal
              trigger={
                <button type="button" className="nav-mobile-btn">
                  <FiLogOut className="icon-mobile" />
                </button>
              }
              className="popup-content"
            >
              {close => (
                <div className="popup-context">
                  <p className="logout-message">
                    Are you sure, you want to logout
                  </p>
                  <div className="confirm-cancel-btn-container">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-btn"
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

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <button
                className="theme-button"
                type="button"
                data-testid="theme"
                onClick={() => toggleThemeButton()}
              >
                <FaMoon className="theme-icon" />
              </button>
            </li>

            <li className="nav-menu-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-image"
              />
            </li>
          </ul>
          <Popup
            modal
            trigger={
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            }
            className="popup-content"
          >
            {close => (
              <div className="popup-context">
                <p className="logout-message">
                  Are you sure, you want to logout
                </p>
                <div className="confirm-cancel-btn-container">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="confirm-btn"
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
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-image"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-image"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <div className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-image"
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)

/** src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout" */
