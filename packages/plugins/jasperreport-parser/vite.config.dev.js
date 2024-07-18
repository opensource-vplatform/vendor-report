import {
  defineConfig,
  loadEnv,
} from 'vite';

import viteConfigBase from './vite.config.base';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
    },
    ...viteConfigBase,
  };
});
