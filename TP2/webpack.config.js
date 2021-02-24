const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: "./public/scripts/main.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./dist/bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/dist/assets/images',
                        },
                    },
                ],
            },
        ]
    }
}

module.exports = config;
