import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const getSassLoaders = (options: Record<string, unknown> = {}) => [
  isProd ? MiniCssExtractPlugin.loader : require.resolve("style-loader"),
  {
    loader: require.resolve("css-loader"),
    options: { sourceMap: !isProd, modules: options.modules },
  },
  require.resolve("postcss-loader"),
  require.resolve("resolve-url-loader"),
  {
    loader: require.resolve("sass-loader"),
    options: { sourceMap: true },
  },
];

const config: Configuration = {
  devtool: !isProd && "eval-cheap-module-source-map",
  entry: "./src/index.tsx",
  target: isProd ? "browserslist" : "web",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: isProd ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            plugins: [!isProd && require.resolve("react-refresh/babel")].filter(
              Boolean
            ),
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: getSassLoaders(),
        sideEffects: true,
      },
      {
        test: /\.module.scss$/,
        use: getSassLoaders({
          modules: {
            localIdentName: isProd
              ? "[hash:base64]"
              : "[local]--[hash:base64:5]",
          },
        }),
        sideEffects: false,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
    isProd && new WorkboxWebpackPlugin.GenerateSW(),
    isProd && new MiniCssExtractPlugin(),
    isProd && new BundleAnalyzerPlugin(),
    !isProd && (new ReactRefreshWebpackPlugin() as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  ].filter(Boolean),
};

export default config;
