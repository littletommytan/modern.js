---
title: act
---

用于确保渲染、事件、数据获取等行为已经应用在 DOM 上。

## 使用姿势

```ts
import { act } from '@modern-js/runtime/testing';
```

## 函数签名

`act` 和 [react-dom/test-utils act 函数](https://reactjs.org/docs/testing-recipes.html#act) 是一致的。

## 示例

```tsx
import ReactDOM from 'react-dom';
import { act } from '@modern-js/runtime/testing';
import { Foo } from '@/components/Foo';

describe('test act', () => {
  it('it should be foo', () => {
    const el = document.createElement('div');
    act(() => {
      ReactDOM.render(<Foo />, el);
    });

    expect(el.innerHTML).toBe('<div>Foo</div>');
  });
});
```
