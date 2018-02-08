const path = require('path');

module.exports = {
  client : {
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, './public/scripts'),
      filename: 'index.js',
    },
    module: {
      loaders: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-1'],
          },
          test: /\.js$/,
          exclude: /node_modules/,
        }],
    },
  },
  // server: {
  //   entry: './server/index.js',
  //   output: {
  //     path: path.resolve(__dirname, './'),
  //     filename: 'index.js',
  //   },
  //   module: {
  //     loaders: [
  //       {
  //         loader: 'babel-loader',
  //         query: {
  //           presets: ['es2015', "stage-2"],
  //           plugins: [
  //             "syntax-async-functions",
  //             "transform-regenerator",
  //           ],
  //         },
  //         test: /\.js$/,
  //         exclude: /node_modules/,
  //       },
  //     ],
  //   },
  //   node: {
  //     fs: false,
  //     net: false,
  //   },
  // }
};
