const path = require( "path" );
const webpack = require( 'webpack' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );

const base_environment =
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
                        loader: 'typings-for-css-modules-loader',
                        options:
                        {
                            modules: true,
                            camelCase: true,
                            namedExport: true
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
        new CleanWebpackPlugin(['./www']),
        new HtmlWebpackPlugin({ template: './src/index.template.html', inject: 'body' }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    ]
};

module.exports = env =>
{
    if( env.production )
    {
        let production_environment = base_environment;
        production_environment.plugins.push(
            new UglifyJSPlugin()
        );

        return production_environment;
    }
    else if( env.development )
    {
        let development_environment = base_environment;
        development_environment.devtool = 'inline-source-map';
        development_environment.devServer = {
            contentBase: './www', hot: true,
            historyApiFallback: true,
            publicPath: '/',
            proxy: {
                '/api': {
                     target: 'http://localhost:8081',
                     secure: false
                 }
             }
            };
        development_environment.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        
        return development_environment;
    }
    else
    {
        throw Error( "Please specify environment as either production or development" );
    }
};
