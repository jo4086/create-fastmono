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
    build: "unbuild",
    lint: "eslint src --ext .ts",
  };
}

export function generateConfig(props: GenerateToolsProps) {
  return {
    fileName: "build.config.ts",
    content: `import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ["./src/index"],
});
`,
  };
}
