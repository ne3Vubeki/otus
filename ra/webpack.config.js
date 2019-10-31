const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/main.tsx",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}
