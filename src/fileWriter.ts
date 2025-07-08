import fs from "fs-extra";
import path from "path";

export async function writeWorkspaceYaml(root: string, packages: string[]) {
  const content = `packages:\n${packages.map((p) => `  - packages/${p}`).join("\n")}\n`;
  await fs.writeFile(path.join(root, "pnpm-workspace.yaml"), content);
}

export async function writeRootPackageJson(
  root: string,
  scripts: Record<string, string>,
  projectName: string,
) {
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
      "typescript",
    ],
    repository: {
      type: "git",
      url: "Enter repository URL here (e.g., https://github.com/yourname/repo.git)",
    },
  };
  await fs.writeJSON(path.join(root, "package.json"), pkgJson, { spaces: 2 });
}

/* export async function writeRootPackageJson(root: string, pkgJson: object) {
  await fs.writeJSON(path.join(root, "package.json"), pkgJson, { spaces: 2 });
} */

export async function writePackagePackageJson(
  pkgDir: string,
  pkgName: string,
  scripts: Record<string, string>,
) {
  const pkgJson = {
    name: pkgName,
    version: "0.1.0",
    scripts,
    description: "Enter a short description of your project here",
    license: "ISC",
    author: "Enter author name or organization here",
  };

  await fs.writeJSON(path.join(pkgDir, "package.json"), pkgJson, { spaces: 2 });
}

export async function writeFile(filePath: string, content: string) {
  await fs.ensureDir(path.dirname(filePath)); // 디렉토리 없으면 생성
  await fs.writeFile(filePath, content);
}
