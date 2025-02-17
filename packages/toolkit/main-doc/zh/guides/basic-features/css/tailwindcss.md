---
sidebar_position: 2
---

# Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个以 Utility Class 为基础的 CSS 框架和设计系统，可以快速地为组件添加常用样式，同时支持主题样式的灵活扩展。在 Modern.js 中使用 [Tailwind CSS](https://tailwindcss.com/)，只需要在项目根目录下执行 `pnpm run new` 并开启。

按照如下进行选择：

```bash
? 请选择你想要的操作 启用可选功能
? 启用可选功能 启用 Tailwind CSS 支持
```

在 `modern.config.ts` 中注册 Tailwind 插件:

```ts title="modern.config.ts"
import TailwindCSSPlugin from '@modern-js/plugin-tailwindcss';
// https://modernjs.dev/docs/apis/app/config
export default defineConfig({
  ...,
  plugins: [..., TailwindCSSPlugin()],
});
```

使用时在入口的根组件(如 `src/App.jsx`)添加如下代码：

```js
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
```

然后即可在各个组件中使用 Tailwind CSS 提供的 Utility Class 了：

```tsx
const App = () => (
  <div className="h-12 w-48">
    <p className="text-xl font-medium text-black">hello world</p>
  </div>
);
```

:::info 补充信息
根据需求不同，你可以选择性的导入 Tailwind CSS 提供的 CSS 文件。由于使用 `@tailwind` 与直接导入 CSS 文件的作用等价，因此关于 Tailwind CSS 提供的 CSS 文件的用途，可以参考 [`@tailwind` 的使用](https://tailwindcss.com/docs/functions-and-directives#tailwind) 文档中注释里的内容。
:::

## Tailwind CSS 版本

Modern.js 同时支持 Tailwind CSS v2 和 v3 版本，框架会识别项目 `package.json` 中的 `tailwindcss` 依赖版本，并启用相应的配置。默认情况下，我们会为你安装 Tailwind CSS v3 版本。

如果你的项目仍在使用 Tailwind CSS v2，我们推荐你升级到 v3 以支持 JIT 等能力。关于 Tailwind CSS v2 与 v3 版本之间的差异，请参考以下文章：

- [Tailwind CSS v3.0](https://tailwindcss.com/blog/tailwindcss-v3)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

### 浏览器兼容性

Tailwind CSS v2 和 v3 均不支持 IE 11 浏览器，相关背景请参考：

- [Tailwind CSS v3 - Browser Support](https://tailwindcss.com/docs/browser-support)。
- [Tailwind CSS v2 - Browser Support](https://v2.tailwindcss.com/docs/browser-support)

如果你在 IE 11 浏览器上使用 Tailwind CSS，可能会出现部分样式不可用的现象，请谨慎使用。

## Theme 配置

当需要自定义 Tailwind CSS 的 [theme](https://tailwindcss.com/docs/theme) 配置的时候，可以在配置 [`source.designSystem`](/docs/configure/app/source/design-system) 中修改，例如，颜色主题中增加一个 `primary`：

```typescript title="modern.config.ts"
export default defineConfig({
  source: {
    designSystem: {
      extend: {
        colors: {
          primary: '#5c6ac4',
        },
      },
    },
  },
});
```

当需要对 Tailwind CSS 做 [theme](https://tailwindcss.com/docs/theme) 以外的其他特殊配置时，可以在 [`tools.tailwindcss`](/docs/configure/app/tools/tailwindcss) 中配置，例如设置 `variants`：

```typescript title="modern.config.ts"
export default defineConfig({
  tools: {
    tailwindcss: {
      variants: {
        extend: {
          backgroundColor: ['active'],
        },
      },
    },
  },
});
```

> 当你为项目配置 Tailwind CSS 的时候，[source.designSystem](/docs/configure/app/source/design-system) 和 [tools.tailwindcss](/docs/configure/app/tools/tailwindcss) 这两个配置的组合等价于单独配置了一个 `tailwindcss.config.js` 文件。其中 [source.designSystem](/docs/configure/app/source/design-system) 等效于 Tailwind CSS 的 [theme](https://v2.tailwindcss.com/docs/configuration#theme) 配置。
