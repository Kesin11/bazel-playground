""" My jest_test wrapper
ref: https://github.com/bazelbuild/rules_nodejs/blob/stable/examples/jest/jest.bzl
"""

load("@npm//jest:index.bzl", _jest_test = "jest_test")

def jest_test(name, srcs, deps, jest_config, **kwargs):
    # "A macro around the autogenerated jest_test rule"
    args = [
        "--no-cache",
        "--no-watchman",
        "--ci",
    ]
    # 理由が分からなかったがglobではなく、ts_libraryの出力を:test_lib_jsで渡した場合
    # $(location)ではダメで$(locations)にする必要があるらしい
    args.extend(["--config", "$(location %s)" % jest_config])
    # ".."を付けないと以下のようなエラーになる
    # Cannot find module 'typescript/src/int_list' from '__tests__/int_list.test.js'
    # bazelのsandboxによるものなのか、普通に__tests__もトランスパイルしてからjestを実行する場合もこれが必要なのかどうかは分からない
    args.extend(["--modulePaths", "node_modules", ".."])

    for src in srcs:
        args.extend(["--runTestsByPath", "$(locations %s)" % src])

    _jest_test(
        name = name,
        data = [jest_config] + srcs + deps,
        args = args,
        **kwargs
    )