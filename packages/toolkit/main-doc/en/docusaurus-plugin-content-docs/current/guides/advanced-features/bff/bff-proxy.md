---
sidebar_position: 5
title: Use Proxy
---

By configuring the BFF proxy, API requests can be forwarded without manual coding

:::caution
Using a BFF proxy ensures that requests can enter the BFF handler. (eg the request path must contain a bff prefix)
:::

Writing the following BFF proxy configuration in the `modern.server-runtime.config.js` file will proxy requests sent to `http://localhost:8080/api/v1/topics` to `https://cnodejs.org/api/v1/topics`.

```js title="modern.server-runtime.config.js"
import { defineConfig } from '@modern-js/app-tools/server';
export default defineConfig({
  bff: {
    proxy: {
      '/api/v1/topics': 'https://cnodejs.org',
    },
  },
};
```

:::note
For more detail, see [bff.proxy](/docs/configure/app/bff/proxy)。For more proxy info, see [Proxy](/docs/guides/basic-features/proxy)。
:::
