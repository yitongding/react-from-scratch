const path = require("path");

module.exports = () => {
  return {
    mode: "development",
    devtool: "source-map",
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js"
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, "src/packages/react"),
        "react-dom": path.resolve(__dirname, "src/packages/react-dom")
      },
      extensions: [".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            compilerOptions: {
              sourceMap: true
            }
          }
        }
      ]
    },
    devServer: {
      // contentBase: "./dist",
      port: 5000,
      index: "index.html"
    }
  };
};
