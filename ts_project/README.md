# TypeScript using `ts_project`

see: https://bazelbuild.github.io/rules_nodejs/TypeScript.html#compiling-typescript-ts_project

ts_projectは `tsc` の薄いラッパーらしい。基本的にtsconfig.jsonの設定通りにビルドしてくれて、成果物の.jsや.d.tsなどをbazelが追跡可能に拡張しているようだ。

ts_libraryとの違いはドキュメントを参照。

# USAGE
## build
- Transpile .ts to .d.ts and .js

```
npm run build
```

## test
- Run jest with transpiled .js files.

```
npm run test
```