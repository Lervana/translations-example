const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../../paths');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + 3000,
    'webpack/hot/only-dev-server',
    paths.ENTRY_PATH
  ],
  output: {
    path: paths.BUILD_DIR,
    filename: 'static/js/bundle.js',
    publicPath: paths.PUBLIC_PATH,
    pathinfo: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  devServer: {
    contentBase: paths.FRONTEND_DIR,
    historyApiFallback: { disableDotRule: true },
    hot: true,
    port: 3000,
    publicPath: paths.PUBLIC_PATH,
    noInfo: false,
    watchContentBase: true
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [paths.FRONTEND_DIR],
        exclude: [paths.NODE_MODULES_PATH],
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        include: [paths.FRONTEND_DIR],
        exclude: [paths.NODE_MODULES_PATH],
        loader: 'babel-loader',
        query: {
          babelrc: false,
          cacheDirectory: true,
          presets: [
            'babel-preset-stage-0',
            'babel-preset-stage-2',
            'babel-preset-es2015',
            'babel-preset-es2016',
            'babel-preset-react'
          ],
          plugins: [
            'babel-plugin-transform-decorators-legacy',
            'babel-plugin-syntax-trailing-function-commas',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread',
            ['babel-plugin-transform-runtime', { helpers: false, polyfill: false, regenerator: true }]
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap'],
        include: [paths.FRONTEND_DIR],
      },
      {
        test: /\.css$/,
        include: [paths.FRONTEND_DIR],
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?\S*)?$/,
        include: [paths.FRONTEND_DIR],
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.HTML_PATH
    })
  ]
};
