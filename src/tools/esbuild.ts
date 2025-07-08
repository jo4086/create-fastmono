import type {
  GenerateToolsProps,
  GenerateScriptsValueProps,
} from "./tools.type";

export function generateRootScripts(props: GenerateToolsProps) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint .",
  };
}

export function generatePackageScripts(props: GenerateToolsProps) {
  return {
    build: "node esbuild.config.mjs",
    dev: "node esbuild.config.mjs --watch",
    lint: "eslint src --ext .ts",
  };
}

export function generateConfig(props: GenerateToolsProps) {
  return {
    fileName: "esbuild.config.mjs",
    content: `import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
}).catch(() => process.exit(1));
`,
  };
}
