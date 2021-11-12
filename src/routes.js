import React from 'react'
import { Switch, Route } from 'react-router-dom'

import GlobalFeed from './pages/globalFeed'
import Article from './pages/article'
import Authentication from './pages/auth'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={GlobalFeed} />
      <Route exact path="/articles/:slug" component={Article} />
      <Route exact path="/login" component={Authentication} />
      <Route exact path="/register" component={Authentication} />
    </Switch>
  )
}
