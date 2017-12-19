var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
    resolve:
    {
        extensions: ['.ts', '.tsx', '.js']
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
            { test: /\.tsx?$/,  use: "ts-loader" },
            { test: /\.css$/,   use: ["style-loader", "css-loader"] }
        ]
    },
    plugins:
    [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({ template: './src/index.template.html', inject: 'body' })
    ]
};