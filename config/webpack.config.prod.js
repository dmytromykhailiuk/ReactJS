const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "../src/index.tsx")],
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
    port: 4040,
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
      minify: { collapseWhitespace: true },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
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
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "img/[name]-[sha1:hash:7].[ext]" },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 60,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 3,
              },
              webp: {
                quality: 60,
              },
            },
          },
        ],
      },
    ],
  },
};
