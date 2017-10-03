import React from 'react';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import './App.css';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppContainer />
      </Router>
    </ApolloProvider>
  );
}
