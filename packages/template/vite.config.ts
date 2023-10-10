import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import viteArtNetListener from './viteArtNetListener';
export default defineConfig({
  plugins: [motionCanvas(), viteArtNetListener()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
