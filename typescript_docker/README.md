# TypeScript using `ts_library`

see: https://bazelbuild.github.io/rules_nodejs/TypeScript.html#compiling-typescript-ts_library

ts_libraryは `tsc` の薄いラッパーではなく、bazel向けにカスタムしたものらしい。

ts_projectとの違いはドキュメントを参照。

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