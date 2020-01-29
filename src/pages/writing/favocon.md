---
title: Introducing Favocon
date: 2020-01-27
---

import Layout from "../../components/Layout";
export default Layout;

Favocon is a small command line utility I made for generating favicons from
images. It is available on [cargo](https://crates.io/crates/favocon), the
[Rust](https://www.rust-lang.org/) package registry.

![favocon usage gif](https://user-images.githubusercontent.com/3044853/57985881-5dc5ae80-7a66-11e9-8a8a-fff327b83e73.gif)

[Favicons](https://en.wikipedia.org/wiki/Favicon) are the little icon you see on
the tab for a website.

![favicon](/favicon.png)

Favicon files (`.ico` extension) contain one or more small icons inside of them.
When they were invented they were useful because the same file could be used for
a websites icon in the browser and a websites icon when saved to the desktop
(something a lot more popular in 1999). Browsers today look for `<link
rel="icon" href="...">` tags in the HTML and support multiple file formats and
sizes. However, they still fallback to a `favicon.ico` placed at the root of the
website.

Generating these files can be a pain. I would normally have a single high
quality icon I want to use, and somehow need to generate PNGs at multiple
resolutions, an ICO file, and a [site manifest
file](https://developers.google.com/web/fundamentals/web-app-manifest). I would
often just Google "favicon generator" and use one of the top results, which
don't get me wrong, work really well. But I wanted something with less friction.

Favocon does just that. In its simplest usage just call `favocon` with a path to
an image file. All the files you need will be saved to `favocon/` and The HTML you
should place in the head of your `index.html` file are output to the console.

The tool is [free to use](https://crates.io/crates/favocon) and [open source on
Github](https://github.com/coffee-cup/favocon). Please feel free to contribute
or create an issue if you think of any improvements.
