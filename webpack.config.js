const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成html的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

/** 1、path.dirname()  : 获取目录
  * 2、path.basename() : 获取全名
  * 3、path.extname()  : 获取扩展名
  * 4、path.parse()    : 将一个路径转换成一个js对象
  * 5、path.format()   : 将一个js对象转换成路径
  * 6、path.join()     : 拼接多个路径成一个路径
  * 7、path.resolve()  : 将相对路径转为绝对路径
  * 8、__dirname       : 返回被执行的 js 所在文件夹的绝对路径
  * 9、__filename      : 返回被执行的 js 的绝对路径
*/


module.exports = {
    mode: "development", // 开发模式
    entry: '',
    output: {

    },
    // 本地服务配置
    devServer: {
        port: 9000,
        hot: true,
        open: false,
        inline: true, // 用来支持dev-server自动刷新的配置
        historyApiFallback: true,
        compress: true,
        proxy: {
            "/textapi": {
                target: "https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/testapi": ""
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: ["url-loader"],
                include: [srcDir]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: ["url-loader"],
                include: [srcDir]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: ["url-loader"],
                include: [srcDir]
            },
            {
                test: /\.(js|jsx)$/,
                include: [srcDir],
                exclude: /(node_modules|bower_components)/,
                use: ["happypack/loader?id=happybabel"]
            }
        ]
    },
    plugins: {
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"), // 源文件,
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "chunk/[id].[contenthash:8].css"
        }),
        new HappyPack({
            id: "happybabel",
            loaders: ["babel-loader?cacheDirectory=true"],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
    }
}