module.exports = {
    src: [
      "./src/"
    ],
    mode: "file",
    includeDeclarations: true,
    tsconfig: "tsconfig.json",
    out: "./Documentation",
    excludePrivate: false,
    excludeProtected: false,
    excludeExternals: true,
    readme: "README.md",
    name: `Express Typescript Mongodb Starter Documentation`,
    ignoreCompilerErrors: true,
    plugin: "none",
    listInvalidSymbolLinks: true,
    hideGenerator: true,
    verbose: true
  };
