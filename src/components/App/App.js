import React from 'react'
import Authorization from './Authorization'
import classes from './app.module.sass'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './Main'

const App = () => {
  return (
    <div className={classes['app']}>
      <Router>
        <Route path="/" exact component={Authorization}/>
        <Route path="/main" component={Main}/>
      </Router>
    </div>
  )
}

export default App
