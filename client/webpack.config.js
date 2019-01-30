const path = require( "path" );
const webpack = require( 'webpack' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );

const base_environment =
{
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        modules: [
            path.resolve(__dirname + '/src'),
            path.resolve(__dirname + '/node_modules'),
            path.resolve(__dirname + '../')
        ]
    },
    entry: "./src/",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module:
    {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            namedExport: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["src/"]
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./www']),
        new HtmlWebpackPlugin({ template: './src/index.template.html', inject: 'body' }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/])
    ]
};

module.exports = env =>
{
    const define_plugin = new webpack.DefinePlugin({URL_ROOT: '"' + (env.URL_ROOT || "/") + '"'})

    if( env.production )
        return {
            ...base_environment,
            plugins: [...base_environment.plugins, new UglifyJSPlugin(), define_plugin]
        };
    else if( env.development )
        return {
            ...base_environment,
            plugins: [...base_environment.plugins, new webpack.HotModuleReplacementPlugin(), define_plugin],
            devtool: 'inline-source-map',
            devServer: {
                contentBase: './www',
                hot: true,
                historyApiFallback: true,
                publicPath: '/',
                proxy: {
                    '/api': {
                        target: 'http://localhost:8081',
                        secure: false
                    }
                }
            }
        };
    else
        throw Error( "Please specify environment as either production or development" );
};
