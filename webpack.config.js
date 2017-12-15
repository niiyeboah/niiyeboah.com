const webpack = require('webpack')

module.exports = {
  entry: {
    'index.bundle': './public/js/index.client.js',
    'samai.bundle': './public/js/samai.client.js'
  },
  output: {
    filename: './public/js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
}
