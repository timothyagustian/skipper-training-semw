import React from 'react';
import Helmet from 'react-helmet';

import Header from '../../components/Header';
import routes from '../../routes';

export default function AppContainer() {
  return (
    <div>
      <Helmet>
        <title>%s - Preact Universal App</title>
        <body className="app" />
      </Helmet>
      <Header />
      <div className="react-route">{routes}</div>
    </div>
  );
}
