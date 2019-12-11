---
title: Functors
date: 2018-06-01
---

import Layout from "../../components/Layout";
export default Layout;

In mathematics, Functors are a mapping between categories. They define a way to
convert an object in one category to an object in another.

In programming, they are basically the same thing.

> A Functor is a data structure that can be mapped over.

The term Functor is most commonly used Haskell, but nothing about them are
specific to Haskell.

The Haskell Functor type class is defined as

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
```

This means that all data structures that are Functors must implement the `fmap`
function. `fmap` take two parameters. `(a -> b)` is a function which takes a
single parameter of type `a` and returns an item of type `b`. The second
parameter to `fmap` is a Functor of type `a`. A Functor of type `b` is returned.

## Lists

Lets look at an example: The list data structure.

Lists are homogeneous containers which hold 0 or more items. How can we
implement a `fmap` function that allows us to map over every item in the list?
In other words, we need to apply a function to every element in the list and
create a new list with the result of each function application.

```haskell
instance Functor [] where
  fmap _ [] = []
  fmap f (x:xs) = f x : fmap f xs
```

Awesome! A short recursive function which applies `f` to `x`, and appends the
result to `fmap` applied to the tail (rest) of the list. Our base case is when
we get an empty list.

We can now map over any list like so

```haskell
ghci> fmap (^2) [1,2,3]
[1,4,9]

ghci> fmap show [4,5,6]
["4","5","6"]
```

Lists are the most intuitive example for functors, but any data structure can
become one.

## Binary Trees

Let's look at binary trees.

A binary tree can be either empty or of some value with subtrees on the left and
right. In Haskell we would represent that as

```haskell
data Tree a
  = Nil
  | Node a (Tree a) (Tree a)
  deriving (Show)
```

We can make `Tree` a Functor by making it an instance of the typeclass

```haskell
instance Functor Tree where
 fmap _ Nil = Nil
 fmap f (Node x left right) =
   Node (f x) (fmap f left) (fmap f right)
```

All this does it apply the function `f` to every node of the tree. Now we can do
things like this

```haskell
ghci> let t = Node 2 (Node 1 Nil Nil) (Node 6 Nil Nil)

ghci> :t t
t :: Num a => Tree a

ghci> fmap (*10) t
Node 20 (Node 10 Nil Nil) (Node 60 Nil Nil)

ghci> fmap show t
Node "2" (Node "1" Nil Nil) (Node "6" Nil Nil)
```

## Maybes

Another less intuitive instance of the Functor typeclass is the `Maybe` type.

A `Maybe` can be `Nothing` or `Just` a value.

When you map over a Maybe with the function `f`, it will apply `f` to the
contents of the Maybe if it is `Just` a value, otherwise it just returns
`Nothing`.

```haskell
instance Functor Maybe where
  fmap _ Nothing = Nothing
  fmap f (Just x) = Just (f x)
```

As an example, lets say we want to get the head of a list but not crash our
program if the list is empty.

```haskell
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:xs) = Just x
```

If the list is empty we return `Nothing`, otherwise we return `Just x`.

```haskell
ghci> safeHead [1,2,3]
Just 1

ghci> safeHead []
Nothing
```

Now if, for whatever reason, we want to square the head of the list, we could
pattern match on the `Maybe` type to extract the wrapped value and apply the
function.

```haskell
doubleHead :: [Int] -> Maybe Int
doubleHead l =
  case safeHead l of
    Nothing -> Nothing
    Just x -> Just (x^2)
```

But since `Maybe` is an instance of the Functor typeclass we can instead use
`fmap`.

```haskell
ghci> fmap (^2) $ safeHead [2,3,4]
Just 4

ghci> fmap (^2) $ safeHead []
Nothing
```

Much nicer!

## Sugar

Haskell provides a nice infix operator for Functors. This is the `(<$>)`
function, synonymous to `fmap`.

```haskell
ghci> :t (<$>)
(<$>) :: Functor f => (a -> b) -> f a -> f b
```

Our previous examples could have been written like

```haskell
ghci> (^2) <$> [1,2,3]
[1,4,9]

ghci> (*10) <$> Node 2 (Node 1 Nil Nil) (Node 6 Nil Nil)
Node 20 (Node 10 Nil Nil) (Node 60 Nil Nil)

ghci> (^2) <$> safeHead [2,3,4]
Just 4
```
