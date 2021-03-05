const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./dist/src/game.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./public/bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }]
      }
  }
  
  module.exports = config;