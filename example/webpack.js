'use strict'

const path = require('path')

module.exports = {
  entry: {
    recorder: path.join(__dirname, 'recorder.js'),
    player: path.join(__dirname, 'player.js'),
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
