// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const sass = require('sass');
// @ts-ignore FIXME No @types/postcss-preset-env
const postcssPresetEnv = require('postcss-preset-env');

/**
 * @param {any} _webpackEnv
 * @param {any} _argv
 */
module.exports = (_webpackEnv, _argv) => {
  // https://github.com/webpack/webpack/issues/6460#issuecomment-364286147

  /** @type import('webpack').Configuration */
  const config = {
    entry: {
      Bootstrap4: './Bootstrap4.tsx',
      Boxes: './Boxes.tsx',
      Minimal: './Minimal.tsx'
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js'
    },

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
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [postcssPresetEnv],
                sourceMap: true
              }
            },
            { loader: 'sass-loader', options: { implementation: sass, sourceMap: true } }
          ]
        },
        {
          test: /\.html$/,
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      ]
    }
  };

  return config;
};
