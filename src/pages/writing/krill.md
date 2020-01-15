---
title: Krill
description: Dynamic, curried, and minimal programming language.
date: 2020-01-15
draft: true
---

import Layout from "../../components/Layout";
export default Layout;

Krill is a small programming language with a very minimal syntax. You can find
it at [krill.jakerunzer.com](https://krill.jakerunzer.com).

It looks like this.

```python
even = x -> x % 2 == 0
square = x -> x * x
sumOddSquares = sum . filter (not . even) . map square
sumOddSquares [1..100]
# => 166650
```

In this article I will go over some interesting aspects of the language and
briefly explain how it is implemented.

## Concepts

When designing Krill, I wanted to ensure that the language was

- immutable
- clean and friendly to use
- allow a functional coding style

Lets dig into these

### Immutable

Variables in Krill are immutable per scope. 

```python
x = 1
x = 2 # Error!
```

However, you can shadow variables in an inner scope.

```python
x = 0

foo = _ -> {
  x = 1
  print ("inner " ++ x)
}

foo ()
print ("outer " ++ x)

# inner 1
# outer 0
```

### Clean and friendly

This aspect of any language is mostly down to personal preference, but I think
most of us can agree that large amounts of punctuation and complicated symbols
can make code harder to look at. Ruby is easier to read than C++.

In Krill I tried to kept the use of punctuation to a minimum. There are no semi
colons as the end of the line, no commas between function parameters, and no
parens surrounding function arguments. There is even an operator (stolen from
Haskell) dedicated to avoiding parens. It works by evaluating the entire right
side of the operator before the left.  With it, you can change this

```python
print (foo (bar x))
```

to this

```python
print $ foo $ bar x
```

### Allow a functional style

Krill allows a function style because

- there is a dedicated operator for function composition
- functions are treated as first class citizens
- all functions are curried

When using functional languages like Haskell, one of my favourite aspects is how
function composition is actively encouraged and supported by the syntax. In
Krill I wanted to replicated this so added the function composition operator `.`.

The function composition operator takes two functions and returns a new function
where the result of the first one is used as the input to the second.

```python
(f . g) x == f (g x)
```

Another important feature of functional languages is the fact that functions are
treated as first class citizens. This is also the case in Krill. In fact, there
are no "functions", only lambdas (aka closures). You can simulate creating a
function by assigning a lambda to a variable.

```python
add = a b -> a + b
```

Functions in Krill are curried by default. This means that if you don't provide
all arguments, a new function is returned that accepts all remaining arguments.

```python
add10 = add 10
print $ add10 1
# => 11
```
