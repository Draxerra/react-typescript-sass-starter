delete process.env.TS_NODE_COMPILER_OPTIONS;

import { Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import glob from "glob";
import path from "path";
import fs from "fs";

const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin"); // eslint-disable-line @typescript-eslint/no-var-requires
const isProd = process.env.NODE_ENV === "production";
const swSrc = "./src/service-worker.ts";

const getPreloader = (entry: string) => {
  if (/\.css$/.test(entry)) return "style";
  if (/\.woff2?$/.test(entry)) return "font";
  if (/\.(avif|bmp|gif|jpe?g|png|svg|webp)$/.test(entry)) return "image";
  return "script";
};

const getSassLoaders = (modules: boolean) => [
  isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: "../../" },
      }
    : require.resolve("style-loader"),
  {
    loader: require.resolve("css-loader"),
    options: {
      sourceMap: !isProd,
      modules: modules
        ? {
            localIdentName: isProd
              ? "[hash:base64]"
              : "[local]--[hash:base64:5]",
          }
        : false,
      importLoaders: 3,
    },
  },
  {
    loader: require.resolve("postcss-loader"),
    options: isProd
      ? {
          postcssOptions: {
            plugins: [
              [
                "@fullhuman/postcss-purgecss",
                {
                  content: [
                    path.join(__dirname, "./public/index.html"),
                    ...glob.sync(
                      `${path.join(__dirname, "src")}/**/*.{ts,tsx}`,
                      {
                        nodir: true,
                      }
                    ),
                  ],
                },
              ],
            ],
          },
        }
      : {},
  },
  require.resolve("resolve-url-loader"),
  {
    loader: require.resolve("sass-loader"),
    options: {
      sourceMap: true,
    },
  },
];

const config: Configuration = {
  devtool: !isProd && "eval-cheap-module-source-map",
  entry: "./src/index.tsx",
  target: isProd ? "browserslist" : "web",
  output: {
    filename: `static/js/${
      isProd ? "[name].[contenthash].js" : "[name].bundle.js"
    }`,
    chunkFilename: `static/js/${
      isProd ? "[name].[contenthash].chunk.js" : "[name].chunk.js"
    }`,
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    assetModuleFilename: `static/assets/${
      isProd ? "[name].[hash:base64][ext]" : "[name][ext]"
    }`,
  },
  mode: isProd ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
        sideEffects: false,
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: getSassLoaders(false),
        sideEffects: true,
      },
      {
        test: /\.module.scss$/,
        use: getSassLoaders(true),
        sideEffects: false,
      },
      {
        test: [
          /\.avif$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/,
          /\.webp$/,
        ],
        type: "asset",
      },
      {
        test: [/\.woff2?$/, /\.ttf$/],
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    minimize: isProd,
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
    isProd &&
      new PreloadWebpackPlugin({
        rel: "preload",
        as: getPreloader,
        include: "initial",
      }),
    isProd &&
      new PreloadWebpackPlugin({
        rel: "prefetch",
        as: getPreloader,
      }),
    isProd &&
      fs.existsSync(swSrc) &&
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/LICENSE/, /asset-report\.html$/, /asset-manifest\.json$/],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
    isProd &&
      new WebpackManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: "/",
      }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
        chunkFilename: "static/css/[name].[contenthash].chunk.css",
      }),
    isProd &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "asset-report.html",
        openAnalyzer: false,
      }),
    !isProd && (new ReactRefreshWebpackPlugin() as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  ].filter(Boolean),
};

export default config;
