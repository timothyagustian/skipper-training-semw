import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import history from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import graphqlSchema from './graphql';
import api from './api';

const app = express();
const port = process.env.PORT || 8000;

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: graphqlSchema,
    rootValue: { api }
  })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(history());

// Setup webpack dev server
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('build/public'));

app.listen(port, () =>
  console.log(`Server is running. http://localhost:${port}`)
);
