const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
console.log(process.env.NODE_ENV)
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: "./src/index.tsx",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: process.env.NODE_ENV === "production" ? "/assets" : "/",
  },
  module: {
    rules: [
      {
        test: /\.t(s|sx)?$/,
        loader: "swc-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: "all",
    historyApiFallback: true,
    proxy: {
      "/api": "http://0.0.0.0:3005",
      "/static": "http://0.0.0.0:3005",
      changeOrigin: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME,
      template: "./static/index-template.html",
      favicon: "./static/awesomebufo.png"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.APP_NAME": JSON.stringify(process.env.APP_NAME),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },
};
