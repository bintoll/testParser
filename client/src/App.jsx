import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import MainContentLayout from './layouts/MainContentLayout'

class App extends Component {
  render() {
    return (
      <Router>
        <MainLayout>
          <Route exact path="/" component={MainContentLayout}/>
        </MainLayout>
      </Router>
    )
  }
}

export default App
