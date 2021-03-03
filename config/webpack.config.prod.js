const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devServer: {
    port: 4040,
  },
  plugins: [
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
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-modules-typescript-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-modules-typescript-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: false,
            },
          },
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
