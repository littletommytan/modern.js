---
title: loadable
---

用于创建 Loadable 的组件。

## 使用姿势

```ts
import loadable from '@modern-js/runtime/loadable';
```

## 函数签名

```ts
type Options = {
  resolveComponent?: (
    module: Module,
    props: Props,
  ) => React.ComponentType<Props>,
  fallback?: JSX.Element;
  ssr?: boolean;
}

function loadable(loadFn: Function, options?: Options) => LoadableComponent
```

### 参数

#### loadFn

用于加载组件。

```ts
import loadable from '@modern-js/runtime/loadable';

const OtherComponent = loadable(() => import('./OtherComponent'))
```

#### options.resolveComponent

类型：`(module: Module, props: Props) => React.ComponentType<Props>`

`module` 为 `loadFn` 返回的组件，`props` 是 loadable 返回的组件接受的 props 参数。默认的话，我们认为 `import` 的文件都是默认导出 react 组件，这时候直接渲染该组件即可。但当组件是具名导出的，或者我们需要根据具体的 `props` 动态判断需要渲染哪个组件的时候，可以使用 `resolveComponent` 来实现。下面是一个示例：

```ts title='component.js'
export const Apple = () => 'Apple!'
export const Orange = () => 'Orange!'
```

```ts title='loadable.js'
const LoadableApple = loadable(() => import('./components'), {
  resolveComponent: (components) => components.Apple,
})
const LoadableOrange = loadable(() => import('./components'), {
  resolveComponent: (components) => components.Orange,
})
const LoadableFruit = loadable(() => import('./components'), {
  resolveComponent: (components, props) => components[props.fruit],
})
```

#### options.fallback

是否在 loading 阶段显示 fallback 内容。

#### options.ssr

是否支持 SSR，默认值是 `true`。

### 返回值

#### LoadableComponent

```ts
type LoadableComponent<Props> =
  React.ComponentType<
    Props & { fallback?: JSX.Element; }>
  & {
    preload(props?: Props): void;
    load(props?: Props): Promise<React.ComponentType<Props>>;
  }
```
