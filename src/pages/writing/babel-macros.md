---
title: Babel Macros
description: Using and creating Babel macros with JavaScript and TypeScript.
date: 2018-09-05T15:21:00+01:00
---

import Layout from "../../components/Layout";
export default Layout;

[Babel](https://babeljs.io/) macros are a way to apply code transformations
without having to install a new plugin for each transformation. They are
implemented in a clever way and can be very useful. And best of all, they work
out of the box with Create React App, GatsbyJS, and NextJS. This post will dive
into what they are, how to use them, and how to make them using TypeScript.

## Why?

Regular Babel plugins are great, but come with a few downsides.

- They can be difficult for users to setup and configure, especially when using
tools like [CRA](https://create-react-app.dev/) and
[Gatsby](https://www.gatsbyjs.org/). CRA [straight up prevents you](https://github.com/facebook/create-react-app/issues/167) from
editing the config.
- Plugins can lead to confusion as it can be unclear what in the code is being
transpiled and what isn't.
- They can conflict in non-intuitive ways. The ordering you define the plugins
  in is important and when the ordering causes a bug, it can be impossible to
  debug.
  
Babel macros to the rescue!

## What?

Babel macros are possible because of the
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) library
(which is itself a Babel plugin).

This library enables other libraries to create macros by

1. treating all imports that end in `.macro` or `/macro` as a macro.
2. providing a `createMacro` function that gives access to Babel.

## But TypeScript?

If you use TypeScript you can still benefit from the power of macros. Instead of
using the TypeScript compiler (tsc) to compile your code, you can use Babel
with the [TypeScript preset](https://babeljs.io/docs/en/babel-preset-typescript)
instead. This is what CRA, Gatsby, and Next are already configured to do.

## Usage

If you are not using CRA, Gatsby, or Next and have full control over the Babel
pipeline, you can enable using Babel macros in your project by adding the
dependency (if you are using these tools, then you don't have to install or
configure anything).

```shell
npm i --save-dev babel-plugin-macros
```

and adding it to your Babel config

```json
// .babelrc
{
  "plugins": ["macros"]
}
```

Use a macro just by importing it like any other JavaScript dependency. For
example, the [count.macro](https://github.com/coffee-cup/count.macro).

```javascript
import { lines } from "count.macro";

console.log(`This file has ${lines} lines`);
```

## Development

Let's make a macro! The macro will place the contents of a file into a variable
at compile time. A user will be able to use it like this:

```ts
import file from "my.macro";

const contents = file("my-file.txt");
```

This section assumes you have some knowledge of
[ASTs](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and how to manipulate
them with Babel. The [plugin
handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
and [AST explorer](https://astexplorer.net/) are great resources for learning or
familiarising yourself with these concepts.

### Caveats

There are a few caveats you have to keep in mind when developing a macro.

- Macros are evaluated at compile time. This means that the code you write must
  be able to run in Node on whatever machine is using the macro. This means no
`import/export` syntax... unless you compile your macro before using it
(_meta_). In this example we will use TypeScript and compile with `tsc`, but you
can just as easily write your macro in ES6 and compile it with Babel. Just
remember, after updating your macro, **remember to recompile**.
- They must be synchronous. If you do in file IO, make sure to use the sync version.
- To enable type checking when the macro is used in TypeScript, you must lie
  about the type.

### TypeScript

We are going to develop it in TypeScript. If you are not using TypeScript you
can still follow along, just remove the type definitions.

### Setup

First we need to install our dependencies. We will use `yarn` for this.

```shell
yarn add babel-plugin-macros
yarn add --dev typescript jest ts-jest @types/babel__core @types/node @babel/cli @babel/preset-typescript
```

If using TypeScript, create a tsconfig file. [Something like
this](https://github.com/coffee-cup/count.macro/blob/master/tsconfig.json).
Also, if you are using TypeScript you will want to add some definitions for
`babel-plugin-macros` (the ones on
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) are a bit
outdated at the time of writing this. There is a PR open to update them). You
can [grab the updated ones from here](https://github.com/coffee-cup/count.macro/blob/master/typings/babel-plugin-macros.d.ts).


Next we can add some npm/yarn scripts.

```json
"scripts": {
  "build": "tsc -p .",
  "test": "jest",
  "compile": "yarn run build && babel --plugins=babel-plugin-macros --presets=@babel/preset-typescript"
}
```

The `compile` script will first compile our macro, then compile an example file
with Babel. This is really helpful when testing and developing.

Finally, we can create our macro and an example to test with.

```ts
// src/index.macro.ts

// TODO
```

```ts
// examples/test.ts
const x = 1;
```

Run our example with

```shell
yarn compile examples/test.ts
```

You should see the contents of the file output to the console. Awesome! We are
now setup.

### Macro Definition

A macro is created by calling the `createMacro` function from
`babel-plugin-macros`. The macro must be the default export.

```ts
import { createMacro } from "babel-plugin-macros";

const myMacro = createMacro(/* ... */);
export default myMacro;
```

The first argument to `createMacro` is a function that takes an single
parameter: an object with a references, state, and Babel field. This is the type
definition:

```ts
export type References = {
  [key: string]: Babel.NodePath[];
};

export interface MacroParams {
  references: { default: References } & References;
  state: any;
  babel: typeof Babel;
}

export type MacroHandler = (params: MacroParams) => void;

export function createMacro(handler: MacroHandler, options?: Options);
```

#### `references`

This is the main thing our macro will use to manipulate the AST. References is
an object that contains Babel `NodePaths` all the places your macro was
imported. For example, if I have the following source.

```ts
import foo, { bar } from "my.macro";

foo(); // line 3
foo(); // line 4

const x = bar + 1; // line 6
```

References will be:

```ts
{
  default: [/* NodePath line 3 */, /* NodePath line 4 */],
  bar: [/* NodePath line 6 */]
}
```

This is important to note and tripped me up when I was first learning about
macros. 

> The default export of your macro file is always called with references
to all places it was imported and used. Even if the user imports a named
export from your macro, the default export will still be called.

Since references contain Babel `NodePaths`, they allow use to manipulate the
ASTs. This is what we will use below.

#### `state`

The state of the file being traverse. This is the second argument received in a
visitor function of a normal Babel plugin. It will look something like:

```json
{
  "file": {
    "declarations": {},
    "path": NodePath,
    "ast": Node,
    "code": string,
    "opts": {
      /* ... */
    },
    "scope": Scope
    // ...
  },
  "filename": string
  // ...
}
```

#### `babel`

Same as `require("babel-core")`. We can use it to get [Babel
types](https://babeljs.io/docs/en/babel-types).

```ts

const myMacro = ({ references, state, babel }) => {
  const t = babel.types;
};
```

## Our Macro 

With the above knowledge, here is our macro.

```ts
import { createMacro, MacroHandler } from "babel-plugin-macros";
import * as fs from "fs";
import * as path from "path";

const myMacro: MacroHandler = ({ references, state, babel }) => {
  const t = babel.types;
  const currentFilename = state.file.opts.filename;

  references.default.map(({ parentPath }) => {
    if (
      t.isCallExpression(parentPath.node) &&
      t.isStringLiteral(parentPath.node.arguments[0])
    ) {
      const filename = path.resolve(
        path.dirname(currentFilename),
        parentPath.node.arguments[0].value
      );
      const contents = fs.readFileSync(filename, "utf8");
      parentPath.replaceWith(t.stringLiteral(contents));
    }
  });
};

export default createMacro(myMacro) as (filename: string) => string;
```

You can see I had to manually case the type to `(filename: string) => string`.
This way TypeScript users will get type checking and autocomplete when using
this macro. If my macro was a named export instead, I could type with:

```ts
export const file = null as (filename: string) => string;
```

Finally, we can change the example to:

```ts
// examples/test.ts
import file from "../lib/index.macro";

const contents = file("test.ts");
```

The tranpsiled code will be,

```ts
const contents = "import file from \"../lib/index.macro\";\n\nconst contents = file(\"test.ts\");\n";
```

## Conclusion

Babel macros are a great way to add compile time transformations to your
project. They are low effort to setup and already work if you are using CRA,
Gatsby, or Next. There are already a lot of macros available (check out
[awesome-babel-macros](https://github.com/jgierer12/awesome-babel-macros)), but
I believe there is still a lot of untapped potential. They are also fairly easy to
create, especially if you already have some experience writing Babel plugins.
