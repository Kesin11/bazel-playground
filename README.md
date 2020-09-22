# bazel-playground
My first bazel playground project

## javascript
- [x] install
- [x] simple test
- [x] jest
- [x] eslint

## ts_library(typescript)
- [x] install
- [x] tsc
- [x] jest

## ts_project(typescript)
- [x] install
- [x] tsc
- [x] jest(ts-jest)

## typescript_docker
- [x] replace npm to yarn
- [x] build
- [x] add apt packages

## remote_cache
- [ ] build
- [ ] test

## typescript_monorepo
- [ ] build
- [ ] create each package.json

# デバッグ時のメモ
## bazelコマンドの実行ログをファイルで見る
bazelは以下のコマンドで出力されるファイルにログを全て出力するのでtail -fすると見られる
```
bazel info command_log
```

## 実際に実行されているコマンド、sandboxの中をあとから見る
- -s: 実行されているサブコマンドを表示
- --verbose_failures: 失敗時のログを多く表示？
- --sandbox_debug: 通常は実行後に削除されるsandboxディレクトリを保持する

jestに渡している引数がログに表示され、ログに表示されるsandboxのパスを実行後に実際にlsなどで見ることが可能

```
bazel test -s --verbose_failures --sandbox_debug //...
```

## BUILD.bazelでの各ruleのdepsやoutputsを見る
前段でビルドされた成果物を次に渡す場合など、`:lib`のように指定するが、その中に実際に含まれているファイルを確認する。

```
bazel aquery //:lib > log
```

例えばts_libraryの場合は以下のような結果になるので、.d.tsと.jsの両方がOutputsに存在することが分かる

```
  Outputs: [bazel-out/k8-fastbuild/bin/src/index.d.ts, bazel-out/k8-fastbuild/bin/src/index.js, bazel-out/k8-fastbuild/bin/src/int_list.d.ts, bazel-out/k8-fastbuild/bin/src/int_list.js, bazel-out/k8-fastbuild/bin/src/printer.d.ts, bazel-out/k8-fastbuild/bin/src/printer.js]
```

## 成果物の依存関係をgraphvizで見る
npmの依存を表示すると巨大になりがちなので `except @npm//...:*` で削除すると良い

```
bazel query --notool_deps --noimplicit_deps "deps(//:container) except @npm//...:*"  --output graph
```

# 参考リンク
- https://bazelbuild.github.io/rules_nodejs/
- https://github.com/bazelbuild/rules_nodejs/tree/stable/examples
- https://github.com/bazelbuild/rules_nodejs/tree/stable/packages/typescript/test
- https://dataform.co/blog/typescript-monorepo-with-bazel
- https://github.com/OasisDigital/mobx-bazel-build