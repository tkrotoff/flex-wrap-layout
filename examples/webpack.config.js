// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('node:path');

/**
 * @param {any} _webpackEnv
 * @param {any} _argv
 */
module.exports = (_webpackEnv, _argv) => {
  // https://github.com/webpack/webpack/issues/6460#issuecomment-364286147

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: {
      index: './index.tsx',
      Boxes: './Boxes.tsx',
      Minimal: './Minimal.tsx'
    },

    output: {
      path: path.resolve('build')
    },

    devtool: 'source-map',

    plugins: [],

    resolve: {
      extensions: ['.js', '.ts', '.tsx'],

      // https://stackoverflow.com/q/31169760
      alias: { react: path.resolve('node_modules/react') }
    },

    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [['postcss-preset-env']] } }
            },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.html$/,
          type: 'asset/resource',
          generator: { filename: '[name][ext]' }
        }
      ]
    }
  };

  return config;
};
