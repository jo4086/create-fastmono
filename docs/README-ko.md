# create-fastmono

모노레포 프로젝트를 빠르게 생성할 수 있는 CLI 도구입니다.
pnpm 기반의 workspace와 빌드 툴 설정을 자동으로 구성합니다.

## 특징

- pnpm workspace 자동 설정
- 패키지 생성 및 디렉토리 구조 자동화
- 빌드 설정 파일 및 스크립트 자동 생성
- TypeScript, ESLint, 빌드 툴 설치 자동화
- 즉시 사용할 수 있는 모노레포 프로젝트 생성

## 지원 빌드 툴

- esbuild
- rollup
- tsup
- unbuild

## 설치

```bash
pnpm create fastmono
```

<!-- 또는 개발 중에 직접 실행
pnpm exec create-fastmono -->

## 사용법

CLI에서 프로젝트명, 패키지명, 빌드 툴을 입력하면 자동으로 스캐폴드가 생성됩니다.

## 생성되는 항목

- pnpm-workspace.yaml
- 루트 및 패키지 package.json
- 최소설정의 빌드 설정 파일(선택한 빌드 툴에 따라)
- Typescript 설정 파일
- 기본 src/index.ts 파일

## 라이선스

MIT
