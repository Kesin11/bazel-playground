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
    args.extend(["--config", "$(location %s)" % jest_config])

    for src in srcs:
        args.extend(["--runTestsByPath", "$(locations %s)" % src])

    _jest_test(
        name = name,
        data = [jest_config] + srcs + deps,
        args = args,
        **kwargs
    )