var webpack = require('webpack');

var htmlW = require('html-webpack-plugin');

var htmlWConfig = new htmlW({
  template:`${__dirname}/index.html`, //处理的文件
  filename:'index.html',
  inject:'body'
});

module.exports = {
  // devtool:'inline-source-map',//错误调试
  //入口文件
  entry:{
    app:'./src/js/index.js'
  },

  // 出口文件
  output:{
    path: `${__dirname}/dist`, //输出目录
    publicPath:'/', //路径
    filename:'index_bundle.js'//输出的文件名
  },

  //加载器配置

  module:{

    rules:[
      // 1 处理js
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader :'babel-loader'
      },
      // css处理
      {
        test:/\.css$/,
        use:[
          {loader:"style-loader"},
          {loader:"css-loader"}
        ]
      },
      // 3处理图片
      {
        test:/\.(jpg|png|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1000,
              name:"images/[hash:8].[name].[ext]"
            }
          }
        ]
      },

      // 4 处理字体图标

      {
        test:/\.(ttf|woff|svg|eot)\??.*$/,
        use:[
          {
            loader:'file-loader',
            options:{
              name:'fonts/[hash:8].[name].[ext]'
            }
          }
        ]

      },

    ]

  },

  // 插件配置
  plugins:[
    htmlWConfig
  ]




}
