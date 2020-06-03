# Usage Without Yoshi

`wix-style-react` works best when [Yoshi](https://github.com/wix/yoshi) is used as build tool.
if you do not wish or cannot use it, you can use webpack. However, at the moment additional configuration is required.

## Webpack Loaders

In order to handle `.scss` files, you will need to
ensure webpack has some required loaders configured by adding
`node_modules/wix-style-react` to your loaders include array.

#### requirements

We use [Stylable](https://stylable.io) for components in this library. In order for the webpack to work properly you need to install stylable as well.

`yarn add --dev stylable @stylable/core @stylable/webpack-plugin`

or

`npm i --save-dev stylable @stylable/core @stylable/webpack-plugin`

Add Stylable to your Webpack configuration as follows:

```js
const StylableWebpackPlugin = require('@stylable/webpack-plugin');
...
{
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new StylableWebpackPlugin()
  ]
}
```

#### support for scss

```js
loaders: [
  {
    test: /\.scss$/,
    include: [
      path.join(__dirname, 'node_modules/wix-animations'),
      path.join(__dirname, 'node_modules/wix-style-react'),
      path.join(__dirname, 'node_modules/bootstrap-sass') // only if you use Grid component
    ],
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1&camelCase&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader'
    ]
  }
]
```

#### support for .st.css

In order to handle `.st.css` files, you will need to
ensure webpack has some required loaders configured by excluding
`.st.css` files from `css-loader` by using a Negative Lookbehind.

```js
loaders: [
  {
    test: /(?<!\.st)\.css$/,
    loaders: [
      'style-loader',
      'css-loader'
    ]
  }
]
```

#### support for svg (required for icons)
```js
loaders: [
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader'
  }
]
```

## Server Side Rendering

```js
require('css-modules-require-hook')({
  generateScopedName: '[path][name]__[local]__[hash:base64:5]',
  extensions: ['.scss', '.css'],
  camelCase: true
});
```

The scope name pattern has to be the same as in the `webpack.config.js` file
