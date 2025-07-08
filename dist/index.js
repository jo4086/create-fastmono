var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/cli.ts
import prompts from "prompts";

// src/tools/tsup.ts
var tsup_exports = {};
__export(tsup_exports, {
  generateConfig: () => generateConfig,
  generatePackageScripts: () => generatePackageScripts,
  generateRootScripts: () => generateRootScripts
});
function generateRootScripts(props) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint ."
  };
}
function generatePackageScripts(props) {
  return {
    build: "tsup",
    dev: "tsup --watch",
    lint: "eslint src --ext .ts"
  };
}
function generateConfig(props) {
  return {
    fileName: "tsup.config.ts",
    content: `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true
});
`
  };
}

// src/tools/unbuild.ts
var unbuild_exports = {};
__export(unbuild_exports, {
  generateConfig: () => generateConfig2,
  generatePackageScripts: () => generatePackageScripts2,
  generateRootScripts: () => generateRootScripts2
});
function generateRootScripts2(props) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint ."
  };
}
function generatePackageScripts2(props) {
  return {
    build: "unbuild",
    lint: "eslint src --ext .ts"
  };
}
function generateConfig2(props) {
  return {
    fileName: "build.config.ts",
    content: `import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ["./src/index"],
});
`
  };
}

// src/tools/esbuild.ts
var esbuild_exports = {};
__export(esbuild_exports, {
  generateConfig: () => generateConfig3,
  generatePackageScripts: () => generatePackageScripts3,
  generateRootScripts: () => generateRootScripts3
});
function generateRootScripts3(props) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint ."
  };
}
function generatePackageScripts3(props) {
  return {
    build: "node esbuild.config.mjs",
    dev: "node esbuild.config.mjs --watch",
    lint: "eslint src --ext .ts"
  };
}
function generateConfig3(props) {
  return {
    fileName: "esbuild.config.mjs",
    content: `import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
}).catch(() => process.exit(1));
`
  };
}

// src/tools/rollup.ts
var rollup_exports = {};
__export(rollup_exports, {
  generateConfig: () => generateConfig4,
  generatePackageScripts: () => generatePackageScripts4,
  generateRootScripts: () => generateRootScripts4
});
function generateRootScripts4(props) {
  return {
    build: "pnpm -r build",
    dev: "pnpm -r dev",
    lint: "eslint ."
  };
}
function generatePackageScripts4(props) {
  return {
    build: "rollup -c",
    dev: "rollup -c --watch",
    lint: "eslint src --ext .ts"
  };
}
function generateConfig4(props) {
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
`
  };
}

// src/fileWriter.ts
import fs from "fs-extra";
import path from "path";
async function writeWorkspaceYaml(root, packages) {
  const content = `packages:
${packages.map((p) => `  - packages/${p}`).join("\n")}
`;
  await fs.writeFile(path.join(root, "pnpm-workspace.yaml"), content);
}
async function writeRootPackageJson(root, scripts, projectName) {
  const pkgJson = {
    name: projectName,
    private: true,
    scripts,
    description: "Enter a short description of your project here",
    license: "ISC",
    author: "Enter author name or organization here",
    keywords: [
      "monorepo",
      "scaffold",
      "pnpm",
      "cli",
      "workspace",
      "typescript"
    ],
    repository: {
      type: "git",
      url: "Enter repository URL here (e.g., https://github.com/yourname/repo.git)"
    }
  };
  await fs.writeJSON(path.join(root, "package.json"), pkgJson, { spaces: 2 });
}
async function writePackagePackageJson(pkgDir, pkgName, scripts) {
  const pkgJson = {
    name: pkgName,
    version: "0.1.0",
    scripts,
    description: "Enter a short description of your project here",
    license: "ISC",
    author: "Enter author name or organization here"
  };
  await fs.writeJSON(path.join(pkgDir, "package.json"), pkgJson, { spaces: 2 });
}
async function writeFile(filePath, content) {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content);
}

// src/scaffold.ts
import path2 from "path";
import fs2 from "fs-extra";
import { execa } from "execa";
var tools = {
  tsup: tsup_exports,
  unbuild: unbuild_exports,
  esbuild: esbuild_exports,
  rollup: rollup_exports
};
var commonPackages = ["typescript", "eslint"];
var buildToolPackages = {
  esbuild: ["esbuild"],
  rollup: ["rollup", "@rollup/plugin-typescript"],
  tsup: ["tsup"],
  unbuild: ["unbuild"]
};
async function createFastMono({
  projectName,
  packages,
  buildTool
}) {
  const root = path2.resolve(process.cwd(), projectName);
  await fs2.ensureDir(root);
  const tool = tools[buildTool];
  const selectedPackages = [...commonPackages, ...buildToolPackages[buildTool]];
  const rootScripts = tool.generateRootScripts({
    projectName,
    packageName: "",
    rootDir: "",
    packageDir: ""
  });
  await writeRootPackageJson(root, rootScripts, projectName);
  await writeWorkspaceYaml(root, packages);
  await writeFile(
    path2.join(root, ".gitignore"),
    `node_modules/
.pnpm/
dist/
*.tsbuildinfo

npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

.vscode/
.idea/

.DS_Store
.env
`
  );
  for (const pkg of packages) {
    const pkgDir = path2.join(root, "packages", pkg);
    await fs2.ensureDir(pkgDir);
    const pkgScripts = tool.generatePackageScripts({
      projectName,
      packageName: pkg,
      rootDir: root,
      packageDir: pkgDir
    });
    await writePackagePackageJson(
      pkgDir,
      `@${projectName}/${pkg}`,
      pkgScripts
    );
    const { fileName, content } = tool.generateConfig({
      projectName,
      packageName: pkg,
      rootDir: root,
      packageDir: pkgDir
    });
    await writeFile(path2.join(pkgDir, fileName), content);
    await writeFile(
      path2.join(pkgDir, "src/index.ts"),
      `export const ${pkg} = () => '${pkg}';`
    );
  }
  await execa("pnpm", ["add", "-w", ...selectedPackages], {
    cwd: root,
    stdio: "inherit"
  });
  await execa("pnpm", ["install"], { cwd: root, stdio: "inherit" });
}

// src/cli.ts
async function run() {
  const answers = await prompts([
    { type: "text", name: "projectName", message: "Project name:" },
    { type: "list", name: "packages", message: "Packages (comma-separated):" },
    {
      type: "select",
      name: "buildTool",
      message: "Choose build tool:",
      choices: [
        { title: "tsup", value: "tsup" },
        { title: "unbuild", value: "unbuild" },
        { title: "esbuild", value: "esbuild" },
        { title: "rollup", value: "rollup" }
      ]
    }
  ]);
  await createFastMono(answers);
}
export {
  run
};
