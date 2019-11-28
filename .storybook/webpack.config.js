const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'raw-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'raw-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss'],
  },
  plugins: [
    // Fixes warning in moment-with-locales.min.js
    //   Module not found: Error: Can't resolve './locale' in ...
    // new webpack.IgnorePlugin(/\.\/locale$/),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    // Injects env variables to our app
    new webpack.DefinePlugin({
      'webpackVars': {
        ENV: JSON.stringify('local') // This will need to change if the application is ever hosted
      }
    })
  ]
};