const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


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
            template: '',
            filename: ''
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