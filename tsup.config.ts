import { defineConfig } from 'tsup';
import { resolve } from 'path';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

await defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/**/*.ts'],
  outDir: './dist',
  bundle: true,
  esbuildPlugins: [esbuildPluginFilePathExtensions()],
  loader: {
    ".schema": "file",
    ".toml": "file"
  }
});