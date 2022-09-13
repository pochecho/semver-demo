const path = require("path");
import * as webpack from "webpack";
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config: webpack.Configuration = {
  mode: "none",
  entry: {
    main: "./src/main.ts",
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".js"],
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     configFile: "./configs/browser/tsconfig.browser.json",
    //   }),
    // ],
  },
  output: {
    path: path.resolve(__dirname, "../dist/browser"),
  },
  target: "web",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false,
                sourceMap: true,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.html$/i,
        use: "html-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
export default config;
