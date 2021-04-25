// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

/**
 * @param {any} _webpackEnv
 * @param {any} _argv
 */
module.exports = (_webpackEnv, _argv) => {
  // https://github.com/webpack/webpack/issues/6460#issuecomment-364286147

  /** @type import('webpack').Configuration */
  const config = {
    entry: {
      Bootstrap: './Bootstrap.tsx',
      Boxes: './Boxes.tsx',
      Minimal: './Minimal.tsx'
    },

    output: {
      path: path.join(__dirname, 'build')
    },

    devtool: 'source-map',

    plugins: [],

    resolve: {
      extensions: ['.js', '.ts', '.tsx'],

      // https://stackoverflow.com/q/31169760
      alias: { react: path.resolve(__dirname, 'node_modules/react') }
    },

    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,
          // [Babel should not transpile core-js](https://github.com/zloirock/core-js/issues/514#issuecomment-476533317)
          exclude: /\/core-js/,
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
