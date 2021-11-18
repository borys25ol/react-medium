import React from 'react'
import { Switch, Route } from 'react-router-dom'

import GlobalFeed from './pages/globalFeed'
import YourFeed from './pages/yourFeed'
import TagFeed from './pages/tagFeed'
import Article from './pages/article'
import Authentication from './pages/auth'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={GlobalFeed} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  )
}
