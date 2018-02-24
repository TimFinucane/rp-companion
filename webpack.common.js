var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports =
{
    resolve:
    {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    entry: "./src/",
    output:
    {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module:
    {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options:
                        {
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins:
    [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({ template: './src/index.template.html', inject: 'body' })
    ]
};