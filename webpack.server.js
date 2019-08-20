const path = require('path');
const webpackNodeExternals = require('webpack-node-externals')
module.exports = {
  target: 'node',
  entry: './server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: '/(node_modules)/',
        use:[{
          loader: 'babel-loader',
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
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  }
}
