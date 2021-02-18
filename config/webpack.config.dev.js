const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dev-build"),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../node_modules"),
    ],
    extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dev-build"),
    compress: true,
    port: 8080,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
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
