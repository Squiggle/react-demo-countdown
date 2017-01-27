## React Demonstration project

A baseline project using React, TypeScript 2.x and Webpack
The goal is to expand on this project with a series of tasks designed to increase familiarity with React technology, specifically:

* Webpack
* Stateful components
* TSX markup and `render()`
* Component lifecycle:
  * `componentDidMount()`
  * `componentShouldUpdate()` / `componentWillUpdate()`
  * `componentWillUnmount()`

## Installation

1. Clone the repository
2. In the root directory, execute `npm install`
3. To build and run the project, execute `npm run start`

## Goals

1. Update the Webpack configuration to load scss files
2. Create our first component to display the result of a service call
3. To enact changes of state from user input
4. To enact changes of state from external events

### Update Webpack

When running `npm run start` you will see errors importing a `.scss` file.
Webpack does not know how to compile and package this file. We need to add a loader.

In `webpack.config.js`, uncomment the line which adds `scss` to the file loaders:

```
{ test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ]}
```

Note: in this case, the loaders 'style', 'css' and 'sass' relate to different
npm packages:
* `sass-loader` converts scss to css
* `css-loader` css loads the css files
* `style-loader` bundles the css to inline stylesheets

### Create a component

We'll create a component that counts down from 5 seconds to zero.

During the countdown it will display the number of seconds remaining.

Once complete, it will render some text.

## Further reading

[React Component lifecycle](https://facebook.github.io/react/docs/react-component.html)

[Introduction to Webpack](https://webpack.js.org/concepts/)