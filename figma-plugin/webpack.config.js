const configure = require("react-figma-webpack-config");
const dotenv = require('dotenv');
const webpack = require('webpack');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = configure({
  entry: {
    ui: './src/ui.tsx', // The entry point for your UI code
    code: './src/code.tsx' // The entry point for your plugin code
  },
  module: {
    rules: [
      {test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader'},
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
});