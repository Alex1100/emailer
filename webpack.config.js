const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'public/src');
const BUILD_DIR = path.resolve(__dirname, 'public/bundles');

module.exports = {

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      `${SRC_DIR}/index.js`,
    ],
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: 'public/bundles',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader?cacheDirectory',
        include: SRC_DIR,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', "stage-1"],
          plugins: [
            'react-hot-loader/babel',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
          'url-loader?limit=8192',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
