const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const { mode, host } = argv;
  process.env.NODE_ENV = env || mode;
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    entry: path.resolve(__dirname, 'src'),
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'flovv.min.js' : 'flovv.js'
    },
    target: 'web',
    resolve: {
      extensions: ['.js', '.json', '.css'],
      mainFields: ['module', 'browser', 'main'],
      alias: {
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@helpers': path.resolve(__dirname, 'src', 'helpers'),
        '@hooks': path.resolve(__dirname, 'src', 'hooks'),
        '@constants': path.resolve(__dirname, 'src', 'constants')
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
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
            }
          }
        })
      ]
    },
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'flovv',
        template: './public/index.html'
      })
    ],
    devServer: {
      contentBase: './dist',
      disableHostCheck: true,
      port: 9001,
      public: `${host}:9001`,
      historyApiFallback: true
    }
  };
};
