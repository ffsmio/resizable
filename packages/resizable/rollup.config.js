import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig([
  // Main build configuration
  {
    input: {
      index: 'src/index.ts',
      vertical: 'src/vertical.tsx',
      horizontal: 'src/horizontal.tsx',
      resizable: 'src/resizable.tsx',
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        entryFileNames: '[name].esm.js',
        chunkFileNames: '[name].esm.js',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        declaration: false,
        outDir: null,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // Type definitions
  {
    input: {
      index: 'src/index.ts',
      vertical: 'src/vertical.tsx',
      horizontal: 'src/horizontal.tsx',
      resizable: 'src/resizable.tsx',
    },
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].d.ts',
    },
    plugins: [dts()],
  },
]);
