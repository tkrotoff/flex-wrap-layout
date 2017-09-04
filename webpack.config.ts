import * as path from 'path';
import { Configuration, optimize } from 'webpack';

const config: Configuration = {
  entry: {
    'examples/bootstrap3': './examples/bootstrap3.ts',
    'examples/cssgrid': './examples/cssgrid.ts',
    'examples/demo': './examples/demo.ts',
    'examples/detectRowWrap': './examples/detectRowWrap.ts',
    'examples/native': './examples/native.ts',
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: path.join(__dirname, 'build'), // For Bootstrap 3 fonts
    filename: '[name].js'
  },

  plugins: [
    new optimize.CommonsChunkPlugin({names: ['manifest']})
  ],

  resolve: {
    extensions: ['.js', '.ts']
  },

  devtool: 'source-map',

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: {compilerOptions: {declaration: false}} },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {sourceMap: true} },
          { loader: 'sass-loader', options: {sourceMap: true} }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/examples/fonts/'
        }
      },
      { test: /\.html$/, loader: 'file-loader', options: {name: '[path][name].[ext]'} }
    ]
  }
};

export = config;
