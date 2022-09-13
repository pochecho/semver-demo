// const path = require("path");
import * as webpack from "webpack";
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config: webpack.Configuration = {
  mode: "none",
  entry: {
    main: "./src/main.ts",
    styles: ["./src/main.scss"],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "bds.js",
  // },
  target: "web",
  // plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // sourceMap: true,
              sassOptions: {
                // outputStyle: "compressed",
              },
            },
          },
        ],
      },

      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      // },
      {
        test: /\.tsx?/,
        use: ["ts-loader"],
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
