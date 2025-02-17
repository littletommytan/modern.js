---
title: cleanup
sidebar_position: 3
---

Used to uninstall all currently rendered components.

## Usage

```ts
import { cleanup } from '@modenr-js/runtime/testing';
```

## Function Signature

`function cleanup(): void`

## Example

:::info
Note that if you are using a testing framework that supports afterEach and it is injected into your testing environment (such as mocha, Jest, and Jasmine), **will execute `cleanup`** in the afterEach hook by default. Otherwise, you will need to do manual cleanup after each test.
:::

For example, if you use the [ava](https://github.com/avajs/ava) test framework, then you need to use the `test.after Each` hook like this.

```tsx
import { cleanup, render } from '@modern-js/runtime/testing';
import test from 'ava';

test.afterEach(cleanup);

test('renders into document', () => {
  render(<div />);
  // ...
});

// ... more tests ...
```
