# HTML Template

During the build process, Builder will compile based on the HTML template and template parameters to generate several HTML files.

Builder provides some configs to set the HTML template. Through this chapter, you can learn the basic usage of these configs.

## Set Template

HTML templates are usually predefined by the upper framework.

For example, in the Modern.js 2.0 framework, the HTML template is preset by default, and users can also customize the content of the template. You can read the ["Modern.js - HTML Templates"](https://modernjs.dev/v2/docs/guides/basic-features/html) chapter to learn about it.

In Builder, you can use [html.template](/en/api/config-html.html#html-template) and [html.templateByEntries](/en/api/config-html.html#html-templatebyentries) configs to define the path to the custom HTML template.

```ts
export default {
  html: {
    template: './static/index.html',
  },
};
```

## Set Page Title

You can set the HTML `<title>` tag through the [html.title](/en/api/config-html.html#html-title) and [html.titleByEntries](/en/api/config-html.html#html-titlebyentries) configs.

When there is only one page in your project, just use the `html.title` setting directly:

```ts
export default {
  html: {
    title: 'example',
  },
};
```

When there are multiple pages in your project, please use `html.titleByEntries` to set corresponding titles for different pages. `html.titleByEntries` uses the page's "entry name" as the key.

```ts
export default {
  html: {
    titleByEntries: {
      foo: 'Foo',
      bar: 'Bar',
    },
  },
};
```

## Set Page Icon

Builder supports setting [favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon) icon and [apple-touch-icon](https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/) icon.

You can set the favicon through the [html.favicon](/en/api/config-html.html#html-favicon) and [html.faviconByEntries](/en/api/config-html.html#html-faviconbyentries) configs.

```ts
export default {
  html: {
    favicon: './src/assets/icon.png',
  },
};
```

You can also set the apple-touch-icon under iOS through the [html.appIcon](/en/api/config-html.html#html-appicon) config.

```ts
export default {
  html: {
    appIcon: './src/assets/icon.png',
  },
};
```

## Set Meta Tags

You can set the meta tags through the [html.meta](/en/api/config-html.html#html-meta) and [html.metaByEntries](/en/api/config-html.html#html-metabyentries) configs.

For example to setting description:

```ts
export default {
  html: {
    meta: {
      description: 'a description of the page',
    },
  },
};
```

The generated meta tag in HTML is:

```html
<meta name="description" content="a description of the page" />
```

## Set Template Parameters

In HTML templates, you can use a variety of template parameters. The template parameters injected by Builder by default include:

```ts
type DefaultParameters = {
  meta: string; // corresponding to html.meta config
  title: string; // corresponding to html.title config
  mountId: string; // corresponding to html.mountId config
  entryName: string; // entry name
  assetPrefix: string; // corresponding to output.assetPrefix config
  compilation: webpack.Compilation; // Compilation object corresponding to webpack
  webpackConfig: config; // webpack config
  // htmlWebpackPlugin built-in parameters
  // See https://github.com/jantimon/html-webpack-plugin for details
  htmlWebpackPlugin: {
    tags: object;
    files: object;
    options: object;
  };
};
```

You can also use the [html.templateParameters](/en/api/config-html.html#html-templateparameters) and [html.templateParametersByEntries](/en/api/config-html.html#html-templateparametersbyentries) configs to pass in custom template parameters.

For example:

```ts
export default {
  html: {
    templateParameters: {
      text: 'World',
    },
  },
};
```

Then you can read parameters in the HTML template with `<%= text %>`:

```js
<div>hello <%= text %>!</div>
```

The generated HTML code is as follows:

```js
<div>hello world!</div>
```

## Template Engine

Builder supports using [Lodash Template](https://www.lodashjs.com/docs/lodash.template), [EJS](https://ejs.co/), [Pug](https://pugjs.org/) as template engines, the most basic Lodash Template is used as the default template engine.

### [Lodash Template](https://www.lodashjs.com/docs/lodash.template)

When the suffix of the template is `.html`, Builder will use Lodash Template to compile it.

For example, if you define a `text` parameter in a template with a value of `'world'`, Builder will automatically replace `<%= text %>` with the value.

```html
<!-- input -->
<div>hello <%= text %>!</div>

<!-- output -->
<div>hello world!</div>
```

Please read the [Lodash Template](https://www.lodashjs.com/docs/lodash.template) documentation for details.

### [EJS](https://ejs.co/)

When the suffix of the template is `.ejs`, Builder will use the EJS template engine to compile it. EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.

For example, you can first refer to a `.ejs` template through the [html.template](/en/api/config-html.html#html-template) config:

```ts
export default {
  html: {
    template: './static/index.ejs',
  },
};
```

Then define a `user` parameter in the template with a value of `{ name: 'Jack' }`. Builder will automatically replace `<%= user.name %>` with the value.

```html
<!-- input -->
<% if (user) { %>
<h2><%= user.name %></h2>
<% } %>

<!-- output -->
<h2>Jack</h2>
```

Please read the [EJS](https://ejs.co/) documentation for details.

### [Pug](https://pugjs.org/)

When the suffix of the template is `.pug`, Builder will use the Pug template engine to compile it. Pug is a robust, elegant, feature rich template engine for Node.js.

Before using the Pug template, you need to enable the [tools.pug](/en/api/config-tools.html#tools-pug) config, and define the [html.template](/en/api/config-html.html#html-template) config to reference a `.pug` template:

```ts
export default {
  html: {
    template: './static/index.pug',
  },
  tools: {
    pug: true,
  },
};
```

Then you can use Pug syntax in `.pug` templates:

```html
<!-- input -->
p Hello #{text}!

<!-- output -->
<p>Hello World!</p>
```

Please read the [Pug](https://pugjs.org/) documentation for details.
