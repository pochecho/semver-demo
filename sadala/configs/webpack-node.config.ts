const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const DeclarationBundlerPlugin = require("./declaration-bundler-webpack-plugin.fix");
import * as webpack from "webpack";

// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config: webpack.Configuration = {
  mode: "development",
  entry: {
    main: "./src/main.ts",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "package.json", to: "package.json" }],
    }),

  ],
  output: {
    path: path.resolve(__dirname, "../dist/node"),
    library: "sadala",
    libraryTarget: "umd",
    // library: "myclient",
  },
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
                declaration: true,
                module: "commonjs",
                moduleResolution: "node",
                sourceMap: true,
                outDir: "./dist/node",
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
