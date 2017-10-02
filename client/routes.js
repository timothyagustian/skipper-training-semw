import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/:slug" component={Post} />
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;
