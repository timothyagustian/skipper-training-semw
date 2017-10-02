import React from 'react';
import { render } from 'react-dom';

import App from './App';

const MOUNT_NODE = document.getElementById('root');

const renderWeb = Container => {
  render(<Container />, MOUNT_NODE);
};

window.addEventListener('DOMContentLoaded', () => {
  renderWeb(App);
});

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      renderWeb(NextApp);
    });
  }
}
