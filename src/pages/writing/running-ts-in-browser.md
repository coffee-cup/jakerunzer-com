---
title: TypeScript in the Browser
date: 2020-04-15
draft: false
---

import Caption from "../../components/Caption";
import Layout from "../../components/Layout";
export default Layout;


_This post will be based off [this
CodeSandbox](https://codesandbox.io/s/ts-typechecking-in-the-browser-gg9il).
Some of the writing is unfinished _

![Stock image of a laptop and code](https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80)

<Caption>Random picture of a computer by <a href="https://unsplash.com/photos/FGXqbqbGt5o">Joshua Aragon</a></Caption>

I recently had to get [TypeScript](https://www.typescriptlang.org/) running in
the browser for [Alfie](https://alfie.prodo.ai), an online code editor that
gives you live feedback on your code. We had previously only showed parse and
runtime errors, but we wanted to more advanced type errors that are only
detectable with static analysis (e.g. TypeScript).

TypeScript can easily be run programmatically for files on the file system. With
a little configuration it can even be run on code that only exists in memory.
However, running TypeScript in the browser with no access to the file system
turned out to be a bit more challenging than I thought.

Credit where credit is due: [Andrew's](https://twitter.com/atcb) blog post,
[_Overengineering a blog_](https://blog.andrewbran.ch/overengineering-a-blog/),
and [associated source](https://github.com/andrewbranch/blog) were an invaluable
resource. Thanks Andrew!


---

The main functionality I wanted was to query the compiler for type errors.

```ts
function getTypeErrors(code: string): TypeError[] {
  /* ... */
}
```

For this I reached for the TypeScript language service, which is a layer on top
of the core compiler and provides common editor like operations.

![TypeScript language service](https://raw.githubusercontent.com/wiki/Microsoft/TypeScript/images/architecture.png)

<Caption><a href="https://github.com/microsoft/TypeScript/wiki/Architectural-Overview">TS compiler architecture</a></Caption>

The compiler does not directly use the filesystem and instead interacts with an
abstraction on top of it. When running TypeScript in Node, then the default
abstraction is just a wrapper around `fs`. However, in the browser we do not
have access to the filesystem so we need to create these abstractions
ourselves.

To create a language service in the browser we need the following:

- virtual system
- virtual compiler host
- virtual language service host

### System

A `ts.System` contains methods for reading files, writing files, checking if a
file exists, etc. If you run TypeScript in Node, then the system is a wrapper
around `fs`. The filesystem does not exist in the browser, so we have to create
our own _virtual_ system.

```ts
import * as ts from "typescript";

export function createSystem(files: { [name: string]: string }): ts.System {
  files = { ...files };
  return {
    args: [],
    createDirectory: () => {
      throw new Error("createDirectory not implemented");
    },
    directoryExists: directory =>
      Object.keys(files).some(path => path.startsWith(directory)),
    exit: () => {
      throw new Error("exit not implemented");
    },
    fileExists: fileName => files[fileName] != null,
    getCurrentDirectory: () => "/",
    getDirectories: () => [],
    getExecutingFilePath: () => {
      throw new Error("getExecutingFilePath not implemented");
    },
    readDirectory: directory => (directory === "/" ? Object.keys(files) : []),
    readFile: fileName => files[fileName],
    resolvePath: path => path,
    newLine: "\n",
    useCaseSensitiveFileNames: true,
    write: () => notImplemented("write"),
    writeFile: (fileName, contents) => {
      files[fileName] = contents;
    },
  };
}
```

We pass in an object from filename → file contents that contains all of our
files on our virtual filesystem.

# TODO

## Compiler Host

> A CompilerHost which represents the users' system, with an API for reading
> files, checking directories and case sensitivity etc.

## Language Service Host

## Language Service

## Getting Diagnostics

- why
  - alternatives
- virtual system
- compiler host
- getting diagnostics

## Resources

- [Andrew's Overengineering a Blog post](https://blog.andrewbran.ch/overengineering-a-blog/#the-language-service)
- [Using the Compiler
  API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler)
- [TypeScript Architectural Overview](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)
- [Langauge Service API](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)
- [Alfie](https://alfie.prodo.ai)
