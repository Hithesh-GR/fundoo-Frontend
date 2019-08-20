const path = require('path');
module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: '/(node_modules)/',
                use: [{
                    loader: 'babel-loader',
                    // query: {compact: false},
                    options: {
                        compact: false,
                        presets: [
                            'react',
                            'stage-0',
                            ['env', {
                                target: {
                                    browsers: ['last 2 versions']
                                }
                            }]
                        ]
                    }
                }],
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[path][name]-[hash:8].[ext]'
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                    // style-loader
                    {
                        loader: 'style-loader'
                    },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    }
}