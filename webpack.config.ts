import path from 'path';
import webpack from 'webpack';
import sass from 'sass';

export default (_webpackEnv: any, _argv: any) => {
  // See https://github.com/webpack/webpack/issues/6460#issuecomment-364286147

  const config: webpack.Configuration = {
    entry: {
      'examples/native': './examples/native.ts',
      'examples/bootstrap3': './examples/bootstrap3.ts',
      'examples/bootstrap4': './examples/bootstrap4.ts',
      'examples/demo': './examples/demo.ts',
      'examples/demo-bootstrap3': './examples/demo-bootstrap3.ts',
      'examples/cssgrid': './examples/cssgrid.ts',
      'examples/detectRowWrap': './examples/detectRowWrap.ts',
      'examples/DetectRowWrapWithDevTools': './examples/DetectRowWrapWithDevTools.tsx',
      'examples/UseDetectRowWrap': './examples/UseDetectRowWrap.tsx'
    },

    output: {
      path: path.join(__dirname, 'build'),
      publicPath: path.join(__dirname, 'build'), // For Bootstrap 3 fonts
      filename: '[name].js'
    },

    plugins: [],

    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { compilerOptions: { noEmit: false, module: 'esnext', sourceMap: true } }
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { implementation: sass, sourceMap: true } }
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
        {
          test: /\.html$/,
          loader: 'file-loader',
          options: { name: '[path][name].[ext]' }
        }
      ]
    }
  };

  return config;
};
