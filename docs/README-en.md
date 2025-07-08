# create-fastmono

A CLI tool to quickly scaffold a monorepo project.
It automatically sets up pnpm workspace and build tools.

## Features

- Auto setup for pnpm workspace
- Auto creation of packages and directory structure
- Auto generation of build config files and package scripts
- Auto installation of Typescript, ESLint, and build tools
- Ready-to-use monorepo proejct after scaffolding

## Supported Build Tools

- esbuild
- rollup
- tsup
- unbuild

## Installation

```bash
pnpm create fastmono
```

## Usage

The CLI will guide you to input project name, package names, and build tool.

## Generated Items

- pnpm-workspace.yaml
- Root and package-level package.json
- Build config files (depending on selected tool)
- Typescript configuration
- Basic src/index.ts template

## License

MIT
