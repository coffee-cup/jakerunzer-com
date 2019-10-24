---
category: blog
title: Applicatives
date: 2017-12-08T22:18:00+00:00
---

Applicative functors are more powerful than Functors but not as powerful as
monads. They provide a way to partially apply a function inside an Applicative
context to parameters also inside the same context.

Confused? Well hopefully after this article you won't be.

As we saw [earlier](/blog/functors), a Functor is just a Haskell typeclass with the
single required `fmap` function.

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
```

We can apply a function from `a -> b` to a value wrapped inside of a functor
context.

Now what if we want to apply a function to multiple arguments that are all
wrapped inside of a context? Such as summing two numbers wrapped in a `Maybe`.

```haskell
(Just 1) + (Just 2) -- ?
```

If we apply `fmap` to `Just 1` with the `(+)` function we get back another
function wrapped in the `Maybe` context.

```haskell
ghci> :t (+) <$> Just 1
(+) <$> Just 1 :: Num a => Maybe (a -> a)
```

But now we are stuck. We need to apply a function inside of the Maybe context to
a number inside the Maybe context.

This is where Applicatives come in!

They allow us to take a function which operates on <span
class="underline">normal</span> unwrapped values, and apply it to parameters
which are all wrapped in a context.

The typeclass definition requires all Applicatives to be Functors (meaning they
all implement the `fmap` function).

```haskell
class (Functor f) => Applicative f where
  pure  :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
```

An Applicative must implement the `pure` and `(<*>)` functions.

`pure` just takes a normal unwrapped value and wraps it into an Applicative
context.

`(<*>)` takes a function wrapped in an Applicative context and a parameter also
wrapped. It then unwraps both, applies `a` to the function, and wraps the result
back up.

Lets see how it is implemented for the `Maybe` type.

```haskell
instance Applicative Maybe where
  pure x = Just x
  (Just f) <*> (Just x) = Just (f x)
  _ <*> _ = Nothing
```

If either Maybe types are `Nothing` then `Nothing` is returned. Otherwise, each
value is unwrapped (via pattern matching), the function is applied to the
contents of second Maybe, and the result is wrapped back up as a Maybe.

Since all functions in Haskell are curried, we can partially apply a function of
`n` arguments to `n` parameters wrapped in the Applicative context.

Using our above example, summing two numbers wrapped in a Maybe would look like
this

```haskell
ghci> (+) <$> Just 1 <*> Just 2
Just 3
```

We first use `<$>` to partially apply `+` to `Just 1`. Functor stuff. But then
we use `<*>` to take the wrapped function and apply it to the wrapped parameter.

Alternatively we can use the `pure` function to wrap `(+)` inside of an
Applicative.

```haskell
ghci> pure (+) <*> Just 1 <*> Just 2
Just 3
```

What happens if one of the parameters is `Nothing`?

```haskell
ghci> (+) <$> Just 1 <*> Nothing
Nothing
```

This is awesome! We don't have to worry about checking whether or not our
parameters are valid. The `(<*>)` function does that for us under the hood.
