---
title: TypeScript in the Browser
date: 2020-04-15
draft: false
description: Learn how to typecheck code in the browser using TypeScript.
---

import Caption from "../../components/Caption";
import Layout from "../../components/Layout";
export default Layout;

![Stock image of a laptop and code](https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80)

<Caption>Random picture of a computer by <a href="https://unsplash.com/photos/FGXqbqbGt5o">Joshua Aragon</a></Caption>

I recently had to get [TypeScript](https://www.typescriptlang.org/) running in
the browser for [Alfie](https://alfie.prodo.ai), an online code editor that
gives you live feedback on your code. We had previously only showed parse and
runtime errors, but we wanted to show more advanced type errors that are only
detectable with static analysis (e.g. TypeScript).

TypeScript can easily be used programmatically for files on the file system.
With a little configuration it can even be run on code that only exists in
memory. However, running TypeScript in the browser with no access to the file
system turned out to be a bit more challenging than I thought. In this post I
will go over setting up a TypeScript language service that you can use to get
type errors, quick info, documentation, etc, of code in the browser.

All code in this post can be found in [this
CodeSandbox](https://codesandbox.io/s/ts-typechecking-in-the-browser-gg9il).

Credit where credit is due: [Andrew's](https://twitter.com/atcb) blog post,
[_Overengineering a blog_](https://blog.andrewbran.ch/overengineering-a-blog/),
and [associated source](https://github.com/andrewbranch/blog) were an invaluable
resource. Thanks Andrew!

---

The main functionality I wanted was to query the compiler for type errors.

```ts
function typecheck(code: string): TypeError[] {
  /* ... */
}
```

For this I reached for the TypeScript language service, which is a layer on top
of the core compiler and provides common editor like operations.

![TypeScript language service](https://raw.githubusercontent.com/wiki/Microsoft/TypeScript/images/architecture.png)

<Caption><a href="https://github.com/microsoft/TypeScript/wiki/Architectural-Overview">TS compiler architecture</a></Caption>

To typecheck code in the browser we need the following:

- Virtual system
- Compiler host
- Language service host
- Language service
- Type files for any language features we want to use

## System

A `ts.System` contains methods for reading files, writing files, checking if a
file exists, etc. If you run TypeScript in Node, then the system is a wrapper
around `fs`. The filesystem does not exist in the browser, so we have to create
our own _virtual_ system. The full file is [here](https://codesandbox.io/s/ts-typechecking-in-the-browser-gg9il?file=/src/system.ts).

```ts
// system.ts
import * as ts from "typescript";

export function createSystem(files: { [name: string]: string }): ts.System {
  files = { ...files };
  return {
    // ...
    directoryExists: directory =>
      Object.keys(files).some(path => path.startsWith(directory)),
    fileExists: fileName => files[fileName] != null,
    getCurrentDirectory: () => "/",
    readFile: fileName => files[fileName],
  };
}
```

We pass in an object from filename → file contents that contains all of our
files on our virtual filesystem.

## Library Types

TypeScript knows the types of variables and functions through the use of
declaration files (`.d.ts` extension). These are what you download when you
install a package from DefinitelyTyped (`@types/package`).

Since there are many different versions of TypeScript/JavaScript, the types of
core language features are not baked into the compiler. Declaration files for
the languages features you want to use must be included in the virtual file
system. This is what the `lib` field in your `tsconfig.json` file configures.

In this demo we will use es2015 and dom features, equivalent to

```json
// tsconfig.json
{
  // ...
  "lib": ["es2015", "dom"]
}
```

The decalaration files are in `node_modules` and can be loaded at build time using the Webpack `raw-loader`.

```ts
// tsLib.ts
export const libs = {
  "/dom.d.ts": require("!raw-loader!typescript/lib/lib.dom.d.ts"),
  "/es2015.d.ts": require("!raw-loader!typescript/lib/lib.es2015.d.ts"),
  "/lib.es5.d.ts": require("!raw-loader!typescript/lib/lib.es5.d.ts"),
  "/lib.es2015.d.ts": require("!raw-loader!typescript/lib/lib.es2015.d.ts"),
  "/lib.es2015.core.d.ts": require("!raw-loader!typescript/lib/lib.es2015.core.d.ts"),
  "/lib.es2015.collection.d.ts": require("!raw-loader!typescript/lib/lib.es2015.collection.d.ts"),
  "/lib.es2015.generator.d.ts": require("!raw-loader!typescript/lib/lib.es2015.generator.d.ts"),
  "/lib.es2015.promise.d.ts": require("!raw-loader!typescript/lib/lib.es2015.promise.d.ts"),
  "/lib.es2015.iterable.d.ts": require("!raw-loader!typescript/lib/lib.es2015.iterable.d.ts"),
  "/lib.es2015.proxy.d.ts": require("!raw-loader!typescript/lib/lib.es2015.proxy.d.ts"),
  "/lib.es2015.reflect.d.ts": require("!raw-loader!typescript/lib/lib.es2015.reflect.d.ts"),
  "/lib.es2015.symbol.d.ts": require("!raw-loader!typescript/lib/lib.es2015.symbol.d.ts"),
  "/lib.es2015.symbol.wellknown.d.ts": require("!raw-loader!typescript/lib/lib.es2015.symbol.wellknown.d.ts"),
};
```

If we wanted to use a third party library, we could include the type file here.

## Compiler Host

The TypeScript compiler interacts with the host environment via a compiler host.

```ts
const compilerHost: ts.CompilerHost = {
  // ...
  getCanonicalFileName: fileName => fileName,
  getDefaultLibFileName: () => "/lib.es2015.d.ts",
  getDirectories: () => [],
  getNewLine: () => sys.newLine,
  getSourceFile: filename => sourceFiles[filename],
  useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
};
```

The compiler host uses `ts.SourceFile`s for representing files on the
filesystem. These include the content of the file as well as additional
metadata, such as the language version. We can easily create source files from
an object from filename -> contents.

```ts
const sourceFiles: { [name: string]: ts.SourceFile } = {};
for (const name of Object.keys(files)) {
  sourceFiles[name] = ts.createSourceFile(
    name,
    files[name],
    compilerOptions.target || ts.ScriptTarget.Latest,
  );
}
```

## Language Service Host

The language service host "abstracts all interactions between the language service and the external world. The language service host defers managing, monitoring, and maintaining input files to the host" ([source](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API#language-service-host)).

This means that the only way the compiler can access the outside world is through the language service host.

```ts
const languageServiceHost: ts.LanguageServiceHost = {
  // ...
  getCompilationSettings: () => compilerOptions,
  getScriptFileNames: () => Object.keys(files),
  getScriptSnapshot: filename => {
    const contents = sys.readFile(filename);
    if (contents) {
      return ts.ScriptSnapshot.fromString(contents);
    }

    return undefined;
  },
};
```

In the above code we create a `ScriptSnapshot` instead of returning the contents of the file as a string because they allow efficient incremental parsing. The snapshot contains information about the entire contents of the file, as well as changes made from a previous snapshot. Since we are not worrying about incremental parsing in this demo, a new snapshot is created every time.

## Language Service

The final thing we need is a `ts.LanguageService`. This will be our main
interface into the compiler. In a proper application you would create the
language service once and update the (virtual) file contents as you need. This
would allow the compiler to perform various optimizations such as only
parsing and typechecking code that has changed. However, in our demo we will
create a new language service every time we want to typecheck some code.

```ts
const languageService = ts.createLanguageService(languageServiceHost);
```

## Getting Diagnostics

The language service contains a bunch of useful functions for querying the compiler.

![language service available functions](./language-service.png)

The one we are most interested in is `getSemanticDiagnostics`, which will return an array of `ts.Diagnostic`s that look like,

```ts
{
  file: SourceFileObject;
  start: number;
  length: number;
  code: number;
  messageText: string;
}
```

The field `messageText` is a human readable description of the problem found.

## Implementation

Using the information above, lets implement a function for typechecking some input code.

First, we need to specify some compiler options. This object looks nearly
identical to what you find in `tsconfig.json`.

```ts
const compilerOptions: ts.CompilerOptions = {
  ...ts.getDefaultCompilerOptions(),
  jsx: ts.JsxEmit.React,
  strict: false,
  target: ts.ScriptTarget.Latest,
  esModuleInterop: true,
  module: ts.ModuleKind.None,
  suppressOutputPathCheck: true,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
};
```

And now onto our typechecking function. Some code is commented out for
concisness as it is shown in more detail above. The full typechecking code can
be found
[here](https://codesandbox.io/s/ts-typechecking-in-the-browser-gg9il?file=/src/typecheck.ts).

```ts
const typecheck = (code: string): ts.Diagnostic[] => {
  // Create our virtual file system
  const dummyFilename = "file.ts";
  const files: { [name: string]: string } = {
    [dummyFilename]: code,
  };
  const sys = createSystem({ ...libs, ...files });

  // create source files from the `files` object
  const sourceFiles: { [name: string]: ts.SourceFile } = {};
  for (const name of Object.keys(files)) {
    /* ... */
  }

  // create the compiler host, an abstraction for the language service
  // to interact with the host environment
  const compilerHost: ts.CompilerHost = {
    /* ... */
  };

  // create the language service host, an absctraction of all interactions
  // between the language service and the external world
  const languageServiceHost: ts.LanguageServiceHost = {
    /* ... */
  };

  // create an instance of the TypeScript language service
  const languageService = ts.createLanguageService(languageServiceHost);

  // get all semantic diagnostics for the code we passed into this function
  const diagnostics = languageService.getSemanticDiagnostics(dummyFilename);
  return diagnostics;
};
```

And there you have it! A simple function for typechecking code in the browser with TypeScript.

## Usage

Using the above `typecheck` function on the code

```ts
const x: string = 100;
```

we get

```ts
[{
  file: SourceFileObject
  start: 6
  length: 1
  code: 2322
  category: 1
  messageText: "Type '100' is not assignable to type 'string'."
}]
```

## Improvements

Our current implementation has the overhead of re-creating the language service
everytime we call `typecheck`. An improvment we could make is to only create a
single instance of the language service and just update the contents of the
virtual file when something changes. If we can track which parts of the file
have updated, we can pass that information to the compiler via a
`ScriptSnapshot` to enable incremental parsing.

We could also use the language service to offer IDE like features in the browser with things like quick info, function documentation, JSX closing tag hints, and much more.

## Conclusion

Although getting TypeScript running in the browser is not as simple as
installing a package from NPM, with a little understaning of how the language
service works, we can get the full power of TypeScript in the browser fairly
quickly. With that we can query the compiler for type errors and access many more IDE
like features.

## Resources

- [Companion CodeSandbox](https://codesandbox.io/s/ts-typechecking-in-the-browser-gg9il?file=/src/typecheck.ts)
- [Andrew's Overengineering a Blog post](https://blog.andrewbran.ch/overengineering-a-blog/#the-language-service)
- [Using the Compiler
  API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler)
- [TypeScript Architectural Overview](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)
- [Langauge Service API](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)
- [Alfie](https://alfie.prodo.ai)
