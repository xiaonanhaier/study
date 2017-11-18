
const webpack = require("webpack"); //引入webpack

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});


module.exports =  {

  devtool: 'inline-source-map',  //sourcemap配置，方便错误调试

  //entry 入口源文件
  entry: {
    app: './src/index.js',
  },

  // output 输出路径
  output: {
    path: `${__dirname}/dist`, //输出目录
    publicPath : '/',   //html中引入路径为 /index_bundle.js
    filename: 'index_bundle.js',  // 输出的文件名
  },

  // 加载器
  module: {

    rules: [
        // 1 js 和 es2015
        {
              test: /\.js$/,
              exclude: /node_modules/,  //排除node_modules中的js文件
              loader: 'babel-loader'
        },
        // 2 css
        {
          test: /\.css$/,
          use: [
            {loader : "style-loader"},
            {loader : "css-loader"},
          ]
        },

        // 3 图片
        {
          test: /\.(jpg|png|gif)$/,
          use:[
            {
              loader:"url-loader",
              options:{
                limit:1000,
                name : "images/[hash:8].[name].[ext]"
              }
            }
          ]
        },

        // 4 css中的iconfont
        {
          test: /\.(ttf|woff|svg|eot)\??.*$/,
          use:[
            {
              loader:'file-loader',
              options:{
                name:'fonts/[hash:8].[name].[ext]'
              }
            }
          ]
        },

    ],
  },

  // devServer 则是 webpack-dev-server 设定
  devServer: {
    host:'0.0.0.0',  //  使用本地ip访问
    inline: true,   // 使用inline模式
    quiet: true,
    port: 8080,
    disableHostCheck: true, //解决Invalid Host header问题
    proxy:{
      '/api':{
        target:"https://api.douban.com/v2/",
        changeOrigin:true,
        secure:false,
        pathRewrite:{"^/api":""}
      }
    }
  },

  // plugins 放置所使用的插件
  plugins: [
      HTMLWebpackPluginConfig,
  ],
};
