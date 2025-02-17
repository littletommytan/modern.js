---
sidebar_label: enableFrameworkExt
---
# server.enableFrameworkExt

* 类型： `Boolean`
* 默认值： `false`

默认情况下，开启[自定义 Web Server 功能](/docs/guides/advanced-features/web-server)后，Middleware 会使用 Modern.js 本身的语法。

开启 `server.enableFrameworkExt` 可以使用其他框架扩展的语法。

```typescript title="modern.config.ts"
export default defineConfig({
  server: {
    enableFrameworkExt: true,
  }
});
```

## 示例

默认的使用方式：

```ts title="server/index.ts"
import { Middleware } from '@modern-js/runtime/server';

export const middleware: Middleware = (ctx, next) => {
  console.log(ctx.request.url);
  next();
};
```

开启后，Middleware 类型将从其他命名空间下导出，并且可以使用框架拓展的语法：

```ts title="server/index.ts"
import { SomeType } from '@modern-js/runtime/{frameworknName}';

export const middleware: SomeType = (...args) => {
  console.log(args[0].url);
  next();
};
```

:::note
上述代码为伪代码，具体使用方式需要参考对应的框架拓展。
:::
