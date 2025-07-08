import type { GenerateToolsProps } from "./tools.type";

export function generateRootScripts(props: GenerateToolsProps) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint .",
  };
}

export function generatePackageScripts(props: GenerateToolsProps) {
  return {
    build: "rollup -c",
    dev: "rollup -c --watch",
    lint: "eslint src --ext .ts",
  };
}

export function generateConfig(props: GenerateToolsProps) {
  return {
    fileName: "rollup.config.mjs",
    content: `import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [typescript()],
});
`,
  };
}
