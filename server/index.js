import 'babel-polyfill';
import express from 'express';
import history from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app = express();
const port = process.env.PORT || 8000;

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

app.use(history());
app.use(express.static('build/public'));

app.listen(port, () =>
  console.log(`Server is running. http://localhost:${port}`)
);
