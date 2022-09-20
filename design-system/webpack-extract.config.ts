import * as webpack from "webpack";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config: webpack.Configuration = {
  mode: "none",
  entry: {
    styles: ["./src/main.scss"],
  },
  resolve: {},

  target: "web",
  plugins: [new MiniCssExtractPlugin({
    filename: 'main.css'
  })],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
export default config;
