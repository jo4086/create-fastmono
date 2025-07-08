import * as tsup from "./tools/tsup";
import * as unbuild from "./tools/unbuild";
import * as esbuild from "./tools/esbuild";
import * as rollup from "./tools/rollup";
import * as fileWriter from "./fileWriter.js";
import { BuildToolModule } from "./index.types";
import path from "path";
import fs from "fs-extra";
import { execa } from "execa";

const tools: Record<string, BuildToolModule> = {
  tsup,
  unbuild,
  esbuild,
  rollup,
};
const commonPackages = ["typescript", "eslint"];
const buildToolPackages = {
  esbuild: ["esbuild"],
  rollup: ["rollup", "@rollup/plugin-typescript"],
  tsup: ["tsup"],
  unbuild: ["unbuild"],
} as const;

interface CreateFastMonoProps {
  projectName: string;
  packages: string[];
  buildTool: "esbuild" | "rollup" | "tsup" | "unbuild";
}

export async function createFastMono({
  projectName,
  packages,
  buildTool,
}: CreateFastMonoProps) {
  const root = path.resolve(process.cwd(), projectName);
  await fs.ensureDir(root);

  const tool = tools[buildTool];

  const selectedPackages = [...commonPackages, ...buildToolPackages[buildTool]];

  const rootScripts = tool.generateRootScripts({
    projectName,
    packageName: "",
    rootDir: "",
    packageDir: "",
  });

  await fileWriter.writeRootPackageJson(root, rootScripts, projectName);
  await fileWriter.writeWorkspaceYaml(root, packages);
  await fileWriter.writeFile(
    path.join(root, ".gitignore"),
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
`,
  );

  for (const pkg of packages) {
    const pkgDir = path.join(root, "packages", pkg);
    await fs.ensureDir(pkgDir); // 패키지 디렉토리 생성

    const pkgScripts = tool.generatePackageScripts({
      projectName,
      packageName: pkg,
      rootDir: root,
      packageDir: pkgDir,
    });
    await fileWriter.writePackagePackageJson(
      pkgDir,
      `@${projectName}/${pkg}`,
      pkgScripts,
    );

    const { fileName, content } = tool.generateConfig({
      projectName,
      packageName: pkg,
      rootDir: root,
      packageDir: pkgDir,
    });

    await fileWriter.writeFile(path.join(pkgDir, fileName), content);
    await fileWriter.writeFile(
      path.join(pkgDir, "src/index.ts"),
      `export const ${pkg} = () => '${pkg}';`,
    );

    /*     await fileWriter.writeFile(
      path.join(pkgDir, '')
    ) */
  }
  await execa("pnpm", ["add", "-w", ...selectedPackages], {
    cwd: root,
    stdio: "inherit",
  });
  await execa("pnpm", ["install"], { cwd: root, stdio: "inherit" });
}
