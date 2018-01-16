const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'index.bundle': './public/js/index.client.js',
    'samai.bundle': './public/js/samai.client.js'
  },
  output: {
    filename: './public/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: ['style-loader'],
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new ExtractTextPlugin('public/css/[name].css')
  ]
}
