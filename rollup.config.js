// @ts-check

import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const isProd = process.env.NODE_ENV === 'production';

function outputFileName() {
  let fileName = `flex-wrap-layout.${process.env.NODE_ENV}`;
  fileName += isProd ? '.min.js' : '.js';
  return fileName;
}

export default {
  input: './src/index.ts',
  output: {
    file: `dist/umd/${outputFileName()}`,
    name: 'FlexWrapLayout',
    format: 'umd',
    sourcemap: true
  },

  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
          target: 'es5',
          downlevelIteration: true,
          lib: ['dom.iterable', 'dom']
        }
      }
    }),
    isProd && uglify(),
    filesize()
  ]
};
