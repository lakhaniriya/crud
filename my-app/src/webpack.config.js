const path = require('path')

module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        library: "ui-lib"
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"]
            },
            {
              test: /\.js$|jsx/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts","js"]
    },
    externals: {
        react: "react"
    }
}