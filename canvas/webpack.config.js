const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./public/src/game.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./dist/bundle.js"
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
