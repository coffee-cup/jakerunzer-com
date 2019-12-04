---
title: Babel Macros
---

import Layout from "../../components/Layout";
export default Layout;

# Babel Macros

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
- They can conflict in non-intuitive ways. The ordering you defining the plugins
  in is important and when the ordering causes a bug, it can be impossible to debug.
  
Babel macros to the rescue!

## What?

Babel macros are possible because of the
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) library
(which is itself a Babel plugin).

This library enables other libraries to create macros by

1. treating all imports that end in `.macro` or `/macro` as a macro.
2. providing a `createMacro` function that gives access to Babel.

### Usage

If you are not using CRA, Gatsby, or Next and have full control over the Babel
pipeline, you can enable using Babel macros in your project by adding the dependency.

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

```ts
import { lines } from "count.macro";

console.log(`This file has ${lines} lines`);
```

## Development

### TypeScript

### Macro Definition

#### `references`

#### `state`

#### `babel`
