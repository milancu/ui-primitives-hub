const configure = require("react-figma-webpack-config");

module.exports = configure({
  entry: {
    ui: './src/ui.tsx', // The entry point for your UI code
    code: './src/code.tsx' // The entry point for your plugin code
  },
});