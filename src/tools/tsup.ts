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
    build: "tsup",
    dev: "tsup --watch",
    lint: "eslint src --ext .ts",
  };
}

export function generateConfig(props: GenerateToolsProps) {
  return {
    fileName: "tsup.config.ts",
    content: `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true
});
`,
  };
}
