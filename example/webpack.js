'use strict'

const path = require('path')

module.exports = {
  entry: {
    mediarecorder: path.join(__dirname, 'media-recorder.js'),
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
