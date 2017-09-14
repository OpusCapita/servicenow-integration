const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './www/index-page.js',
  output: {
    path: path.resolve(__dirname, './src/server/static'),
    publicPath: '/static',
    filename: 'bundle.js'
  },

  //exclude empty dependencies, require for Joi
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  devtool: 'eval-source-map',

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|de/),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {modules: false}],
            'react',
            'stage-0'
          ],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
