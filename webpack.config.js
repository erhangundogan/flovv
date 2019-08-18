const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const { mode } = argv;
  process.env.NODE_ENV = env || mode;
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    entry: path.resolve(__dirname, 'src'),
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[hash].js',
      chunkFilename: '[name].[hash].js'
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.css', '.js', '.json'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        components: path.resolve(__dirname, 'src/components/')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            //'eslint-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        }
      ]
    },
    optimization: {
      splitChunks: {
        name: true,
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            filename: 'vendor.[contenthash].js',
            priority: -10
          }
        }
      },
      runtimeChunk: true
    },
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'flovv',
        template: './public/index.html'
      })
    ],
    devServer: {
      contentBase: './dist',
      disableHostCheck: true,
      host: "0.0.0.0",
      port: 9001,
      public: "localhost:9001",
    }
  };
};

