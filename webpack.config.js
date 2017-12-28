// webpack.config.js
var glob = require('webpack-glob-entries');
var path = require("path");
var resolveModules = [path.resolve(__dirname, 'modules/'), path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'toolkit')];

module.exports = {
  entry: glob('./modules/*/skin/react/module.jsx'),
  output: {
    path: path.resolve(__dirname, "pub/static/"), // This is where images AND js waill go
    publicPath: '/', // This is used to generate URLs to e.g. images
    filename: 'bundle.js'
  },
  target: 'web',
  context: __dirname,
  resolve: {
    modules: resolveModules,
    extensions: ['.js', '.jsx']
  },
  watchOptions: {
    ignored: '/node_modules/',
    poll: true
  },
  module: {
    loaders: [{
        test: /\.rt$/,
        loaders: ["babel-loader?presets[]=es2015", "react-templates-loader?modules=es6"],
        exclude: /node_modules/,
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/images/[hash].[ext]'
          }
        }]
      }
    ]
  }
}
