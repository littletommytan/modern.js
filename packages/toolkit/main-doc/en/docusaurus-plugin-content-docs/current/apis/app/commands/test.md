---
sidebar_position: 3
---

```bash
Usage: modern test [options]

Options:
  -h, --help  show command help
```

:::caution
`modern test` command need to execute the `new` command in advance to enable the `unit test/integration test`.
:::

`modern test` command will automatically run the test cases, the effect is as follows:

```bash
$ npx modern test
 PASS  src/tests/index.test.ts
  The add method
    ✓ should work fine. (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.994 s, estimated 1 s
```

:::info
files match `*.test.(js|ts)` in `api/` or `src/` will be recognized as test cases by default。
:::

import CommandTip from '@site-docs-en/components/command-tip.md'

<CommandTip />
