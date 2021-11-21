import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import ContextSection from '../ContextSection'
import HomeTab from '../HomeTab'

import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <ContextSection />
          <HomeTab />
        </div>
      </>
    )
  }
}

export default Home
