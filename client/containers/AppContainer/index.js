import React from 'react';
import Helmet from 'react-helmet';

import Header from '../../components/Header';
import routes from '../../routes';

export default function AppContainer() {
  return (
    <div>
      <Helmet titleTemplate="%s | Skipper SE Training" />
      <Header />
      <div className="main-content">{routes}</div>
    </div>
  );
}
