const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: "./public/scripts/main.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./dist/bundle.js"
    },
    devtool: 'source-map',
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }]
      }
  }
  
  module.exports = config;