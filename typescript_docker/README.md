# Docker build with TypeScript

see: https://github.com/bazelbuild/rules_docker

# USAGE
## build
- Transpile .ts to .js then build container includes them.

```
npm run build
```

## test
- Run jest with ts-jest

```
npm run test
```

# buildで--platformsを指定している理由
bazelのコンテナ作成はホストマシンの中でビルドしたファイルをそのままイメージレイヤーに追加するだけであり、コンテナの中で作業をするDockerfileとは異なる。そのため、macOSでbazelを実行した場合にmacOS向けのnodejsでビルドされた成果物がLinuxのコンテナに追加されてしまい、正しく動作しないという可能性がありえる。

bazelにはクロスコンパイルを行う仕組みが存在するので、それを利用してmacOSで実行したとしてもLinux向けのビルドを行ってからコンテナにファイルを追加する。

see: https://bazelbuild.github.io/rules_nodejs/install.html#toolchains

# 他がWORKSPACE.bazelなのにここではWORKSPACEな理由
nodejs_imageのビルド時に以下のエラーが出たのでWORKSPACEにリネームしたところエラーが解決したため。

```
INFO: Repository bazel_gazelle_go_repository_config instantiated at:
  no stack (--record_rule_instantiation_callstack not enabled)
Repository rule go_repository_config defined at:
  /home/codespace/.cache/bazel/_bazel_codespace/e67c6c6c04a7c074db2176cc8f2b24f7/external/bazel_gazelle/internal/go_repository_config.bzl:57:39: in <toplevel>
ERROR: An error occurred during the fetch of repository 'bazel_gazelle_go_repository_config':
   Traceback (most recent call last):
        File "/home/codespace/.cache/bazel/_bazel_codespace/e67c6c6c04a7c074db2176cc8f2b24f7/external/bazel_gazelle/internal/go_repository_config.bzl", line 25, column 31, in _go_repository_config_impl
                config_path = ctx.path(ctx.attr.config)
Error in path: Not a regular file: /home/codespace/workspace/bazel-playground/typescript_docker/WORKSPACE
ERROR: /home/codespace/.cache/bazel/_bazel_codespace/e67c6c6c04a7c074db2176cc8f2b24f7/external/io_bazel_rules_docker/container/go/cmd/extract_config/BUILD:19:11: no such package '@com_github_google_go_containerregistry//pkg/v1/tarball': no such package '@bazel_gazelle_go_repository_config//': Not a regular file: /home/codespace/workspace/bazel-playground/typescript_docker/WORKSPACE and referenced by '@io_bazel_rules_docker//container/go/cmd/extract_config:go_default_library'
ERROR: Analysis of target '//:nodejs_image' failed; build aborted: Analysis failed
```