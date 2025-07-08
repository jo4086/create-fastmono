import prompts from "prompts";
import { createFastMono } from "./scaffold";

export async function run() {
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
        { title: "rollup", value: "rollup" },
      ],
    },
  ]);

  await createFastMono(answers);
  // await createFastMono(answers); // ✅ CLI는 입력만 넘김 (tools는 신경 안 씀)
}

/* import type { BuildToolModule } from "./index.typs.js";

// const tools = { tsup, unbuild, esbuild, rollup } as const;

const tools: Record<string, BuildToolModule> = {
  tsup,
  unbuild,
  esbuild,
  rollup,
};

type BuildTool = "tsup" | "unbuild" | "esbuild" | "rollup";

export async function run() {
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
        { title: "rollup", value: "rollup" },
      ],
    },
  ]);
  const buildTool = answers.buildTool as BuildTool;
  const projectName = answers.projectName as string;
  const packages = answers.packages as string[];

  await createFastMono({ projectName, packages, buildTool, tools });
  await createFastMono({ projectName, packages, buildTool, tools });
} */
