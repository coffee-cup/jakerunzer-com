---
title: Krill
description: Dynamic, curried, and minimal programming language.
---

import Layout from "../../components/Layout";
export default Layout;

# Krill

A small programming language. You can find it at [krill.jakerunzer.com](https://krill.jakerunzer.com).

It looks like.

```hs
even = x -> x % 2 == 0
square = x -> x \* x
sumOddSquares = sum . filter (not . even) . map square
sumOddSquares [1..100]
# => 166650
```
