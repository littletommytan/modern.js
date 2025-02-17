---
sidebar_position: 4
---

# Less and Sass

[Less](https://lesscss.org/) and [Sass](https://sass-lang.com/) are two commonly used CSS preprocessors that Modern.js built-in support for the Less and Sass compile capabilities.

## Customized Configuration

- If you need to customize the configuration of [less-loader](https://github.com/webpack-contrib/less-loader), please refer to the [tools.less](/docs/configure/app/tools/less).
- If you need to customize the configuration of [sass-loader](https://github.com/webpack-contrib/sass-loader), please refer to the [tools.less](/docs/configure/app/tools/sass).


::: Tips
CSS files pre-compiled by Less and Sass will still undergo Modern.js build-in [PostCSS](https://postcss.org/) conversion, which has good browser compatibility. For related content, please refer to [[PostCSS](/docs/guides/basic-features/css/postcss)].
:::
