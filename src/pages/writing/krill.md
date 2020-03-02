---
title: The Krill Language
description: Dynamic, curried, and minimal programming language.
date: 2020-02-15
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

At a high level Krill is

- dynamic
- interpreted
- eager
- curried
- immutable

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

In Krill I tried to keep the use of punctuation to a minimum. There are no semi
colons at the end of the line, no commas between function parameters, and no
parens surrounding function arguments. There is even an operator (stolen from
Haskell) dedicated to avoiding parens. It works by evaluating the entire right
side of the operator before the left. With it, you can change this

```python
print (foo (bar x))
```

to this

```python
print $ foo $ bar x
```

### Allow a functional style

Krill is not a purely function language like Haskell. However, the following
features allow you to write programs in a functional way.

- Dedicated operator for function composition.
- Functions are treated as first class variables.
- All functions are curried.

When using functional languages like Haskell, one of my favourite aspects is how
function composition is actively encouraged and supported by the syntax. In
Krill I wanted to replicated this, so I added the function composition operator `.`.

The function composition operator takes two functions and returns a new function
where the result of the first one is used as the input to the second.

```python
(f . g) x == f (g x)
```

With this you can create complicated functions by composing together simple
ones.

```python
even = x -> x % 2 == 0
square = x -> x * x
sumOddSquares = sum . filter (not . even) . map square
```

An important feature of functional languages is the fact that functions are
treated as first class variables. This is also the case in Krill. In fact, there
are no "functions", only lambdas. You can simulate creating a
function by assigning a lambda to a variable.

```python
add = a b -> a + b
```

Lambdas are closures since they _capture_ variables in scope.

```python
foo = _ -> {
  x = "hello"
  name -> x ++ " " ++ name
}

print $ foo () $ "jake"
# => "hello jake"
```

Another functional feature of Krill is automatic function currying. This means
that if you don't provide all arguments, a new function is returned that accepts
all remaining arguments.

```python
add10 = add 10
print $ add10 1
# => 11
```

## Implementation

Krill was implemented in Haskell and the source code is [available on
Github](https://github.com/coffee-cup/krill/). There are three main components of
the compiler: the parser, the interpreter, and the repl.

The
[parser](https://github.com/coffee-cup/krill/blob/master/src/Parser/Parser.hs)
uses the [megaparsec](https://hackage.haskell.org/package/megaparsec) parser
combinator library. My experience with the library (and parser combinators in
general) is mostly positive. My main grievances I encountered are mostly around
error reporting, but this seems to be a commonly known issue with these types of
parsers. The AST for the language has the following type.

```hs
data Expr
 = EApp Loc Expr Expr        -- a b
 | EBinOp Loc Name Expr Expr -- a + b
 | EUnOp Loc Name Expr       -- !a
 | EVar Loc Name             -- a
 | ELam Loc [Name] Block     -- x -> x + 1
 | ELit Loc Literal          -- 3
 | EIf Loc Expr Block Block  -- if cond then block else block
 | EFor Loc Name Expr Block  -- for i in [1,2,3] block
 | EAss Loc Name Expr        -- a = b
 | EList Loc [Expr]          -- [1, x, "hello"]
 | EListAcc Loc Name Expr    -- list[x]
 | ERange Loc Expr Expr Expr -- [1,2..10] or [1..10]
 | EParens Loc Expr          -- (a)
 deriving (Ord, Show)
```

The
[interpreter](https://github.com/coffee-cup/krill/blob/master/src/Eval/Eval.hs)
is built using a monad transformer stack.

```hs
type EvalMonad =
  ExceptT EvalError (StateT EvalState IO)

newtype Eval a = Eval { unEval :: EvalMonad a }
  deriving
    ( Functor
    , Applicative
    , Monad
    , MonadFix
    , MonadIO
    , MonadFail
    , MonadState EvalState
    , MonadError EvalError
    )
```

When building this part of the compiler I really learned to appreciate the value
of monad transformers and the abstraction they bring. One thing that took me a
while to figure out was how to properly report errors during evaluation.

The [repl](https://github.com/coffee-cup/krill/blob/master/src/Repl.hs) uses
[haskeline](https://hackage.haskell.org/package/haskeline) which provides a
fairly nice interface for tab completing common things such as filenames and
variable names. The repl execution loop is
fairly simple. It just runs the compiler and updates the compiler state.

```hs
exec :: CompilerM () -> Repl ()
exec compM = do
  cs <- gets _compilerState
  (cm , cs') <- liftIO $ runCompilerM compM cs
  hoistErr cm
  updateCompilerState cs'
  return ()
```

The overall compiler is also built using a monad transform stack.

```hs
type CompilerMonad =
  ExceptT CompilerError (StateT CompilerState IO)

newtype CompilerM a = Compiler { runCompiler :: CompilerMonad a }
  deriving
    ( Functor
    , Applicative
    , Monad
    , MonadFix
    , MonadIO
    , MonadFail
    , MonadState CompilerState
    , MonadError CompilerError
    )

data CompilerState = CompilerState
  { _fname :: Maybe FilePath
  , _src   :: Maybe L.Text
  , _ast   :: Maybe Module
  , _flags :: Flags.Flags
  , _evalS :: EvalState
  } deriving (Eq)
```

# Conclusions

I've really enjoyed working on Krill and have learned a lot about building
compilers. Haskell is indeed a great language for compilers. Features such as
pattern matching, monads, and abstract data types are amazing. Some aspects of
the Haskell toolchain did frustrate me. Using and version third party libraries
with Stack can be confusing. I still often get confused of the difference
between stack.yaml, package.yaml, and cabal files. I guess these frustrations
help me realise how important a programming languages supporting tools are and
is something I will keep in mind when designing new languages. An intuitive
package manager, compiler, and test runner have a huge effect on developer
experience. Something I think Rust is doing really well at.
