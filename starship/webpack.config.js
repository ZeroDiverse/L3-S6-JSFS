const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: "./public/scripts/main.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./dist/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin ({
            hash: true,
            template: './public/index.html',
            filename: './dist/index.html' //relative to root of the application
        })
    ],
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
