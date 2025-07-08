export interface GenerateToolsProps {
  projectName: string;
  packageName: string;
  packageDir: string;
  rootDir: string;
  opts?: Record<string, unknown>;
}

export interface GenerateScriptsValueProps {
  build: string;
  dev?: string;
  lint: string;
}
