const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  context: __dirname,
  devtool:
    process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  entry: {
    app: './src/app.js',
    vendor: ['babel-polyfill'],
    main: './src/app.js',
    portfolio: './src/portfolio.js'
  },
  output: {
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name].[chunkhash].bundle.js'
        : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'portfolio', 'form.html'),
      filename: './portfolio/form.html'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'portfolio', 'bookclub.html'),
      filename: './portfolio/bookclub.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
};

if (process.env.NODE_ENV === 'development') {
  config.entry.unshift('webpack-hot-middleware/client');
}

module.exports = config;
