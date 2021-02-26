const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  target: "web",
  resolve: {
    alias: {
      scss$: path.resolve(__dirname, "../src/scss/"),
      shared$: path.resolve(__dirname, "../src/shared/"),
      shared$: path.resolve(__dirname, "../src/pages/"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../node_modules"),
    ],
    extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
  },
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    compress: true,
    port: 3000,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new CleanWebpackPlugin()],
};
