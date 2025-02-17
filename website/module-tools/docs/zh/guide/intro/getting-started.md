---
sidebar_position: 3
---

# 快速开始

## 三分钟快速上手

想要实际体验 Module Tools？首先需要安装 [Node.js LTS](https://github.com/nodejs/Release)，并确保 Node 版本大于等于 **14.17.6**。

然后在你的项目里安装以下依赖：

- `@modern-js/module-tools`
- `@modern-js/plugin-testing`

> 如果是一个 TypeScript 项目，则需要增加 `"typescript"` 依赖。

```bash
npm install -D @modern-js/module-tools @modern-js/plugin-testing
```

> 对于使用 pnpm 或者 Yarn 包管理器的项目，只需要替换 npm 就可以了。**推荐使用 pnpm**。

接着在项目的 `package.json` 文件里增加命令 `"build": "modern build"`：

```json
{
  "scripts": {
    "build": "modern build"
  }
}
```

如果你的项目存在 `src/index.(js|jsx)` 文件或者同时存在 `src/index.(ts|tsx)` 和 `tsconfig.json` 文件，那么恭喜你可以运行直接运行 `npm run build` 来使用 Module Tools 构建你的项目了。

**如果你想要看看使用了模块工程方案的真实项目，可以执行以下命令**：

```bash
git clone https://github.com/modern-js-dev/module-tools-examples
cd module-tools-example

## 执行构建：
pnpm build

## 监听模式执行构建：
pnpm build --watch

## 启动 Storybook
pnpm dev storybook

## 测试
pnpm test
```

> 上面的链接对应的内容待补充

**如果你想要创建一个完整的模块工程项目，可以执行以下命令：**

```bash
npx @modern-js/create your-project-dir-name
```

接着在问题交互中，按照如下选择：

```bash
? 请选择你想创建的工程类型 模块
? 请填写项目名称 library
? 请选择开发语言 TS
? 请选择包管理工具 pnpm
```

> 项目名称为 `package.json` 中的 `"name"` 字段值。

接着就会开始初始化项目的流程。在项目目录和文件生成以及依赖安装完毕后，此时就创建了一个完整的模块工程项目。

我们可以直接执行 `pnpm build` 命令启动项目的构建，执行 `pnpm build --watch` 命令开启构建的观察模式。

## 让我们开始吧

选择适合你的教程：

- 我是初学者，需要学习 Module Tools 的[基础使用](/guide/basic/before-getting-started)。
- 我已经初步掌握了 Module Tools 的使用，可以学习 Module Tools 的[高级使用](/guide/basic/before-getting-started)。
- 我是项目的维护者，需要学习如何开发 Module Tools 的插件以及了解更多关于 Module Tools 进阶的内容。
