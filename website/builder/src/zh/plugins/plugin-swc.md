# SWC 插件

[SWC](https://swc.rs/) (Speedy Web Compiler) 是基于 `Rust` 语言编写的高性能 JavaScript 和 TypeScript 转译和压缩工具。在 Polyfill 和语法降级方面可以和 Babel 提供一致的能力，并且性能比 Babel 高出一个数量级。

Modern.js Builder 提供了开箱即用的 SWC 插件，可以为你的 Web 应用提供语法降级、Polyfill 以及压缩，并且移植了一些额外常见的 Babel 插件。

## 快速开始

### 安装

你可以通过如下的命令安装插件:

```bash
# npm
npm install @modern-js/builder-plugin-swc -D

# yarn
yarn add @modern-js/builder-plugin-swc -D

# pnpm
pnpm add @modern-js/builder-plugin-swc -D
```

### 注册插件

在 Modern.js / EdenX 等上层框架中，你可以通过 `builderPlugins` 配置项来注册 SWC 插件：

```ts
import { PluginSwc } from '@modern-js/builder-plugin-swc';

export default {
  builderPlugins: [PluginSwc()],
};
```

当你直接调用 Builder 的 Node API 时，可以通过 `addPlugins` 方法来注册 SWC 插件：

```js
import { PluginSwc } from '@modern-js/builder-plugin-swc';

// 往 builder 实例上添加插件
builder.addPlugins([PluginSwc()]);
```

That's it !

现在你可以在项目中无缝使用 SWC 的转译和压缩能力了。

## 配置

- 类型: `PluginConfig`

```ts
type PluginConfig = {
  presetReact?: ReactConfig;
  presetEnv?: EnvConfig;
  jsMinify?: boolean | JsMinifyOptions;
  extensions?: Extensions;
};
```

### presetReact

- 类型: SWC 中的 [presetReact](https://swc.rs/docs/configuration/compilation#jsctransformreact)。

对标 `@babel/preset-react`。传入的值会与默认配置进行合并。

插件默认会自动根据你的 `tsconfig.json` 文件设置一些配置选项。

- runtime: compilerOptions 中 `jsx` 字段。
- importSource: compilerOptions 中 `jsxImportSource` 字段。
- pragma: compilerOptions 中 `jsxFactory` 字段。
- pragmaFrag: compilerOptions 中 `jsxFragmentFactory` 字段。

如果没有找到 `tsconfig.json` 文件，默认配置是 `{ runtime: automatic }`。

### presetEnv

- 类型: SWC 中的 [presetEnv](https://swc.rs/docs/configuration/supported-browsers#options)。

对标 `@babel/preset-env`。传入的值会与默认配置进行合并。
默认配置为:

```ts
{
  targets: '', // 自动从项目中获取 browserslist
  mode: 'usage',
}
```

### jsMinify

- 类型: `boolean` 或者 [terser 中的 compress 配置](https://terser.org/docs/api-reference.html#compress-options)。

默认配置为: `{ compress: {}, mangle: true }`。

如果配置 `false` 将不会使用 SWC 的压缩能力，配置 `true` 会启用默认压缩配置，如果配置是对象，则会与默认配置进行合并。

### extensions

- 类型: `Object`

从 Babel 移植过来的一些插件能力。

#### extensions.pluginImport

移植自 [babel-plugin-import](https://github.com/umijs/babel-plugin-import)，配置选项保持一致。

一些配置可以传入函数，例如 `customName`，`customStyleName` 等，这些 JavaScript 函数会由 Rust 通过 Node-API 调用，这种调用会造成一些性能劣化。

简单的函数逻辑其实可以通过模版语言来代替，因此`customName`，`customStyleName` 等这些配置除了可以传入函数，也可以传入字符串作为模版来代替函数，提高性能。

我们以下面代码为例说明:

```ts
import { MyButton as Btn } from 'foo';
```

添加以下配置：

```ts
PluginSWC({
  extensions: {
    pluginImport: [
      {
        libraryName: 'foo',
        customName: 'foo/es/{{ member }}'
      },
    ],
  },
});
```

其中的 `{{ member }}` 会被替换为相应的引入成员，转换后:

```ts
import Btn from 'foo/es/MyButton';
```

可以看出 `(member) => "foo/es/" + member` 等同于使用函数 ```(member) => `foo/es/${member}` ```，但是不会有 Node-API 的调用开销。

这里使用到的模版是 [handlebars](https://handlebarsjs.com)，模版配置中还内置了一些有用的辅助工具，还是以上面的导入语句为例，配置成：

```ts
PluginSWC({
  extensions: {
    pluginImport: [
      {
        libraryName: 'foo',
        customName: 'foo/es/{{ kebabCase member }}',
      },
    ],
  },
});
```

会转换成下面的结果:

```ts
import Btn from 'foo/es/my-button';
```

除了 `kebabCase` 以外还有 `camelCase`，`snakeCase`，`upperCase`，`lowerCase` 可以使用。

#### extensions.reactUtils

- 类型: `Object`

```ts
type ReactUtilsOptions = {
  autoImportReact?: boolean;
  removeEffect?: boolean;
  removePropTypes?: {
    mode?: 'remove' | 'unwrap' | 'unsafe-wrap';
    removeImport?: boolean;
    ignoreFilenames?: string[];
    additionalLibraries?: string[];
    classNameMatchers?: string[];
  };
};
```

一些用于 `React` 的工具，包括以下配置项:

**reactUtils.autoImportReact**

- 类型: `boolean`

自动引入 `React`, `import React from 'react'`，用于 `jsx` 转换使用 `React.createElement`。

**reactUtils.removeEffect**

- 类型: `boolean`

移除 `useEffect` 调用。

**reactUtils.removePropTypes**

- 类型:

```ts
type RemovePropTypesOptions = {
  mode?: 'remove' | 'unwrap' | 'unsafe-wrap';
  removeImport?: boolean;
  ignoreFilenames?: string[];
  additionalLibraries?: string[];
  classNameMatchers?: string[];
};
```

移除 `React` 组件在运行时的类型判断。移植自 [@babel/plugin-react-transform-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types)。

相应配置和 `@babel/plugin-react-transform-remove-prop-types` 插件保持一致。

#### extensions.lodash

- 类型: `{ cwd?: string; ids?: string;}`
- 默认值: `{ cwd: process.cwd(), ids: [] }`

移植自 [@babel/plugin-lodash](https://github.com/lodash/babel-plugin-lodash)。

## 限制

不支持 `@babel/plugin-transform-runtime` 以及其他自定义的 Babel 插件。
