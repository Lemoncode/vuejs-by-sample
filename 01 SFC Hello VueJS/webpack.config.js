const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
  mode: 'development',
  entry: {
    app: './main.ts',
    vendor: [
      'vue',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      // this will apply to both plain .js files
      // AND <script> blocks in vue files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // this will apply to both plain .css files
      // AND <style> blocks in vue files
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader'
        ],
      },
      // this will apply to both plain .scss files
      // AND <style lang="scss"> blocks in vue files
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '$color: red;'
            }
          }
        ],
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new VueLoaderPlugin(),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
  ]
};