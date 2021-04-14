const path = require('path');

module.exports = {
  module: {
    rules : [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'  // Syntax to compile to (see options below for possible values)
        }
      },
    ]
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};