const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
    entry: "./public/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./dist/bundle.js"
    },
    mode: (PRODUCTION ? 'production' : 'development'),
    devtool: (PRODUCTION ? undefined : 'eval-source-map'),
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html',
            filename: './dist/index.html' //relative to root of the application
        }),
        new CopyPlugin({
            patterns: [
                //{    // décommenter ce bloc pour copier les fichiers de src/html dans dist/html
                //  context: path.resolve(__dirname, "src", "html"),
                // from: "**/*.html",
                // globOptions: { },
                //   noErrorOnMissing: true,
                // to:  'html'
                //},
                /*   // décommenter ce bloc pour copier les fichiers de src/images dans dist/images
                 {
                   from: 'src/images/*',
                   to:  'images/[name].[ext]',
               noErrorOnMissing: true,
                 },
                */

                {
                    from: 'src/style/*',
                    to:  'style/[name].[ext]',
                    noErrorOnMissing: true,
                },
            ]
        }),
    ],
    devServer: {
        static: {
            publicPath: path.resolve(__dirname, 'dist'),
            watch: true
        },
        host: 'localhost',
        port: 9000,
        open: 'firefox'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
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
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    /*
externals : {
  react: 'React',
  react-dom: 'ReactDom',
},
*/

    optimization: {

        minimize: true,
        minimizer: [new TerserPlugin()],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: false
        }
    }
}
