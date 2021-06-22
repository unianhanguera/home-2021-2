const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (_, { mode }) => ({
  entry: [
    '@babel/polyfill', 
    './src/js/app.js'
  ],
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html'
    }),

    /**
     * Isso aqui irá executar quando rodar  "npm run build", 
     * ele vai mimificar o css e colocar na pasta public/css com o mesmo nome do scss principal "main"
     */
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '../css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      /**
       * em modo de produção ele vai rodar o css-loader ou sass-loader
       * em modo de desenvolvimento vai rodar style-loader
       */
      {
        test: /\.s[ac]ss$/i,
        use: [
          mode !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader', 
        ],     
      },
      { 
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                context: path.resolve(__dirname, "src/"),
                outputPath: '/',
                publicPath: '../',
                useRelativePaths: true
            }
          }
        ] 
      }
    ], 
  }
});