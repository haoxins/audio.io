'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'play'),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
}
