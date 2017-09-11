import * as path from 'path';
import { Configuration } from 'webpack';

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

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: {compilerOptions: {target: 'es5', declaration: false, downlevelIteration: true}} }
    ]
  }
};

export = config;
