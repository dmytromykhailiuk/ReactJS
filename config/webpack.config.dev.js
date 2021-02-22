const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dev-build"),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dev-build"),
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(s[ca]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "img/[name]-[sha1:hash:7].[ext]" },
          },
          "image-webpack-loader",
        ],
      },
    ],
  },
};
