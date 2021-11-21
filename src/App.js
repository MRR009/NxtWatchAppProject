import {Route} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

// Replace your code here
const App = () => (
  <>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
  </>
)

export default App
