const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/popup.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'popup-bundle.js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: { chrome: '88' },
                                    modules: false
                                }],
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ]
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, '../app')
            }
        },
        optimization: {
            minimize: isProduction,
            usedExports: true,
            sideEffects: false
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/popup-template.html',
                filename: 'popup.html',
                inject: 'body',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true
                } : false
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../app/extension/manifest.json'),
                        to: 'manifest.json'
                    },
                    {
                        from: path.resolve(__dirname, '../app/extension/background.js'),
                        to: 'background.js'
                    },
                    {
                        from: path.resolve(__dirname, '../app/extension/content.js'),
                        to: 'content.js'
                    },
                    {
                        from: path.resolve(__dirname, '../app/extension/icons'),
                        to: 'icons'
                    }
                ]
            })
        ],
        devtool: isProduction ? false : 'inline-source-map'
    };
};
