const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // режим webpack оптимизации
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  // начальные файлы
  entry: [
    process.env.NODE_ENV === 'development'
      ? './src/index.dev.js'
      : './src/index.prod.js',
  ],
  // выходные файлы и чанки
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build/[name].js',
  },
  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  // webpack плагины
  plugins: [
    // выделение css во внешний файл таблицы стилей
    new MiniCssExtractPlugin({
      filename: 'build/styles.css',
    }),
    // подготовка HTML файла с ресурсами
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: false,
    }),
    // копирование статических файлов из `src` в `dist`
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
  // настройка распознавания файлов
  resolve: {
    // расширения файлов
    extensions: ['.js', '.jsx', '.css'],
  },
  // webpack оптимизации
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all', // both : consider sync + async chunks for evaluation
          name: 'vendor', // имя чанк-файла
          test: /node_modules/, // test regular expression
        },
      },
    },
  },
  // настройки сервера разработки
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  // генерировать source map
  devtool: 'source-map',
};
