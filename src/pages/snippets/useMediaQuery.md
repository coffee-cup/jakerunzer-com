---
title: useMediaQuery
description: Make media queries in React components
category: react
date: 2020-05-25
draft: true
---

import Layout from "../../components/Layout";
export default Layout;

```ts
import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const mediaQuery = window.matchMedia(query);

  const [value, setValue] = useState(mediaQuery.matches);
  useEffect(() => {
    const handler = () => {
      setValue(mediaQuery.matches);
    };

    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return value;
};
```

## Usage

```tsx
const MyComponent = () => {
  const isSmall = useMediaQuery(`(max-width: 40em)`);

  return <div>{isSmall ? "Small device" : "large device"}</div>;
};
```
