---
title: Introducing Stck
date: 2020-02-13
---

import Layout from "../../components/Layout";
export default Layout;

Stck is a [stack based](https://esolangs.org/wiki/Category:Stack-based)
[esoteric programming
language](https://esolangs.org/wiki/Esoteric_programming_language). You can
check out and use stck at [stck.jakerunzer.com](https://stck.jakerunzer.com), or
find the source on [Github](https://github.com/coffee-cup/stck).

In Stck the only data structures are global stacks. Stacks are identified
using a sequence of alpha characters.

```
# this is a comment!

1>a # push 1 onto stack a
a>  # pop from a
a>b # pop from a and push to be
```

The stacks `o` and `i` are used to output to standard out and take input from
standard in, respectively.

There are two types of primitives in Stck: strings and numbers.

```
"hello">a
1>b
```

In addition to pushing and popping, you can also manipulate the stacks with
operators. Currently, there are four mathematical operators: `+, -, *, /`. The syntax is

`stack+operand` or `stack+stack` or `stack+`

For example,

- `a+b`: Pop from a and b, perform addition, push the result to a.
- `a+`: Pop two values from a, perform addition, push the result to a.
- `a+4`: Pop from a, perform addition with the literal 4, push the result to a.

There is also the clear operator, `?`. `a?` will clear the stack if the topmost
value is 0.

Additionally, there are loops and functions.

```
# create function
{:foo
  # function body
}

:foo # call function foo
```

```
(n
  # loop until stack n is empty
)
```

## Motivation

Stck was created because there was a period of time where I was really into
esolangs and wanted to contribute to that world. Exploring programming language
concepts and design is super interesting. I had never used or created a stack
based language, so I thought that was a good place to start. I will definitely
be creating another esolang in the future, although probably not a stack based
one.
