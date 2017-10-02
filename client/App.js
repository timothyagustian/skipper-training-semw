import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './containers/AppContainer';

export default function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}
