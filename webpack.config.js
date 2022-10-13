const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index'
  },
  resolve:{
    extensions: ['.js', '.ts']
  },
  devtool: 'eval-cheap-module-source-map',
 devServer: {
   static: './dist',
   port: 8080
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ]
  }
};