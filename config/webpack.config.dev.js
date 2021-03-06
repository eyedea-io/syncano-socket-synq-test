const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('../scripts/utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const env = require('./env');
const babelQuery = require('./babel.dev');

module.exports = {
  context: path.appSrc,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index')
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: ''
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      paths.appSrc,
      path.join(__dirname, '../node_modules')
    ],
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'xo-loader',
        include: paths.appSrc
      },
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: babelQuery
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        exclude: paths.stylesSrc,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[path]---[local]---[hash:base64:5]',
              modules: true,
              importLoaders: true,
              sourceMap: true,
              context: paths.appSrc
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.css$/,
        include: paths.stylesSrc,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[path]---[local]---[hash:base64:5]',
              sourceMap: true,
              context: paths.appSrc
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.json$/,
        include: [paths.appSrc, /node_modules/],
        loader: 'json-loader'
      },
      {
        test: /\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.appSrc, /node_modules/],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [paths.appSrc, /node_modules/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname,
        postcss: () => [
          postcssNested(),
          postcssImport({
            path: [paths.stylesSrc],
            addDependencyTo: webpack
          }),
          postcssFocus(),
          cssnext({
            browsers: ['last 2 versions', 'IE > 10']
          })
        ]
      }
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(/node_modules/)
  ]
};
