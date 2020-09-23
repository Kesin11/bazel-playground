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
- [x] GCS
- [x] 本当に使えているのか検証

## Run on CI service
- [ ] Github Actions

# リモートキャッシュを有効にする
see: https://docs.bazel.build/versions/master/remote-caching.html

一番手軽に使えるのはおそらくGCSなので、ドキュメントに従い適当なバケットを新しく作成する。古いキャッシュを削除するためにライフサイクル機能が使えるとドキュメントに書いてあるので、N日後に自動削除されるような設定を入れておくとよい。

バケットをread/writeできるように認証する必要がある。一例としてはサービスアカウントを作成して対象のバケットへの権限を付与し、サービスアカウントのjson鍵を作成しておく。

準備が整ったらbazel実行時に以下のようなオプションを追加する。

```
bazel build --remote_cache=https://storage.googleapis.com/${BUCKET_NAME} --google_credentials=${PATH_TO_SERVICE_ACCOUNT_JSON} //...
```

実行時に毎回オプションを渡すのは大変なので、WORKSPACEと同じ階層に.bazelrcを用意してオプションを追加しておくとよい。
パブリックなリポジトリのように自分のキャッシュ情報を公開したくない場合は、~/.bazelrcに書いたオプションも有効化されるのでそちらに置きましょう。

ref: https://docs.bazel.build/versions/master/guide.html#bazelrc-the-bazel-configuration-file

## リモートキャッシュが使われているかどうか確認する
どこのキャッシュが使われたかどうかをログに出す方法はないっぽい？実行時にremote cacheにヒットしたかどうかは `--execution_log_json_file=path/to/log` でログを出力すると確認できる。ただし、ここでのremote cacheはローカルのディスクキャッシュも含まれる。

bazelはデフォルトでディスクキャッシュが有効化されており、パスはおそらく~/.cache/baze-disk-cache（アンドキュメント）。ディスクキャッシュを無効化するには `--disk_cache=` パスを空白にする=無効化になる（アンドキュメント）  
ref: https://github.com/bazelbuild/bazel/issues/5308

ディスクキャッシュを無効化しつつ、`--remote_cache`を付けたときにもログでremote cacheがヒットしたと表示されていればリモートキャッシュを正しく使えていると判定して大丈夫なはず。

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