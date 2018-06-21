const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  optimization: {
    minimize: false,
  },
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'coliseum',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
  ],
  mode: 'production',
};
