var webpack = require('webpack');
// var htmlWP  = require('html-webpack-plugin');

module.exports = {

  //入口文件
  entry :{
    app: './app/index.js'
  },

  //出口文件
  output:{
    path:`${__dirname}/dist`, //输出目录
    publicPath: './', //路径
    filename : 'index_bundle.js'  //输出的文件名
  },

  //加载器配置
  module:{
    rules: [
      // 1 处理js，所有js文件 es6 转es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets:['es2015'],
        }
      }

    ]
  }





}
