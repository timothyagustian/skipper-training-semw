const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=http://localhost:8000/__webpack_hmr&noInfo=true',
      path.resolve(__dirname, 'client')
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk.[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'client')]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: [/\.eot$/, /\.svg$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.resolve(__dirname, 'client/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
