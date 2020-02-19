var webpack = require('webpack');
const EXPRESS_PORT = process.env.PORT || 8080;
const entries = process.env.NODE_ENV !== 'development' ?
[ './app/client/index.jsx' ] : [
  'webpack-dev-server/client?http://0.0.0.0:8090/',
  'webpack/hot/dev-server',
  './app/client/index.jsx'
];
module.exports = {
  entry: entries,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
       test: /\.css$/,
       loader: 'style!css!autoprefixer?browsers=last 2 versions'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals:[{
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
      react: 'React'
  }],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/socket.io': {
          target: 'http://0.0.0.0:8080',
          secure: false,
          ws: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
