import * as path from 'path';
import { Configuration, optimize } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'flex-wrap-layout.js',
    library: 'FlexWrapLayout',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  plugins: [
    // "webpack -p" already uses DefinePlugin and UglifyJsPlugin

    // See What is flat bundling and why is Rollup better at this than Webpack? https://stackoverflow.com/q/43219030
    new optimize.ModuleConcatenationPlugin()
  ],

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: {compilerOptions: {module: 'esnext', declaration: false}} }
    ]
  }
};

export = config;
