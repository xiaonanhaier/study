const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 模式 默认三种 "production"（为生产构建启用许多优化） | "development" （支持有用的开发工具） | "none" （没有默认值）
    mode: 'development',

    // string | object | array
    // 入口，默认为 './src'; 这里应用程序开始执行;webpack 开始打包
    // 实例值 entry: "./app/entry"；
    // entry: ["./src/test", "./src/index"], 多入口，打包到一个文件
    // entry: {a: "./app/entry-a", b: ["./app/entry-b1", "./app/entry-b2"]}, 多入口，打包到不同的文件
    entry: './src',// 入口

    // webpack 如何输出结果的相关选项
    output: {
        // 打包后的文件名
        // filename: "[name].js", //用于多个入口点(entry point)（出口点？） 指 entry: {a: "./app/entry-a", b: ["./app/entry-b1", "./app/entry-b2"]}
        filename: 'bundle.js',

        // 所有输出文件的目标路径；必须是绝对路径（使用 Node.js 的 path 模块）
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,// 一切服务都启用 gzip 压缩：
        progress: true,// 将运行进度输出到控制台。
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',// title 标签
            template: "./src/index.html",// 模板
            filename: 'index.html'
        })
    ],
    //  webpack 可以监听文件变化，当它们修改后会重新编译。这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,// 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
        poll: 1000,// 或者指定毫秒为单位进行轮询。
        ignored: /node_modules/ 
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}