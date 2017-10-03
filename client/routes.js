import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/p/create" component={NewPost} />
    <Route path="/p/edit/:slug" component={EditPost} />
    <Route path="/p/:slug" component={Post} />
    <Route component={NotFound} />
  </Switch>
);

export default routes;
