import requireTranformer from 'vite-plugin-require-transform';

import commonjs from '@rollup/plugin-commonjs';

export default {
  resolve: {},
  plugins: [commonjs(), requireTranformer()],
};
