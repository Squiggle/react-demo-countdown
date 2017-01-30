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

Prerequisites:

1. NodeJS
2. `npm install -g typescript webpack`

### From scratch

1. `npm install -g yo generator-react-typescript` to install Yeoman, a scaffolder, and the react-typescript generator
2. In a new directory, `yo react-typescript` and follow the prompts

### From Existing Repository

1. Clone the repository
2. In the root directory, execute `npm install`
3. To build and run the project, execute `npm run start`

## Goals

1. Update the Webpack configuration to load scss files
2. Create our first component to display HTML
3. Using a countdown to update the State of the component
4. Setting parameters for the component

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

### New Component

Create a new component called `Countdown.tsx` in the same directory as `Index.tsx`.

```
import * as React from 'react';

class Countdown extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className='countdown'>Countdown</div>
  }
}

export default Countdown;
```

Import this component `import Countdown from './Countdown';`

### Component state

We'll make this component count down from 5 seconds to zero.

Give the component some state:

Import reactive extensions (using `npm install --save rxjs` if necessary):

```
import * as Rx from 'rxjs';
```

Specify our state:

```
interface CountdownState {
  timeRemaining?: number;
  active: boolean;
}
```

```
class Countdown extends React.Component<any, CountdownState> {

  constructor(props: any) {
    super(props);
    this.state = {
      timeRemaining: 5,
      active: false
    };
  }
```

Using RxJS, create an observable countdown and subscribe to it:
```
  private timerSubscription : Rx.Subscription;

  componentDidMount() {
    // Reactive Extensions
    // Use an observable interval that emits every second
    const observable = Rx.Observable
      .interval(1000) // every second
      .timeInterval()  // take the time intervale
      .take(5) // up to a maximum of [seconds]

    // subscribe to this observable
    var timerSubscription = observable
      .subscribe(
        this.tick, // on next
        () => {}, // on error
        this.timerComplete // on complete
      );
  }

  componentWillUnmount() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
```

Fill in the `tick` and `timerComplete` methods, calling `this.setState(...)` to change the state properties and forcing a re-render of the component:

```
  tick = (timeElapsed: Rx.TimeInterval<number>) => {
    this.setState({
      active: false,
      timeRemaining: 5 - timeElapsed.value - 1
    });
  }

  timerComplete = () => {
    this.setState({
      active: true
    });
  }
```

The `render()` method returns the appropriate markup based on the state:

* If the timer is still counting, display the countdown
* If the timer has completed, display some text

```
  render() {
    return <div className='countdown'>
      { !this.state.active && <h2>{ this.state.timeRemaining }</h2> }
      { this.state.active && <h1>Complete!</h1> }
    </div>
  }
```

### Decoupling components using props

In Index.tsx:

* Call countdown with a parameter (the number of seconds)
* Once the countdown is complete, display some other markup

```
    <Countdown from={10}>
      <h2>Ta-dah!</h2>
    </Countdown>
```

In Countdown.tsx:

```
interface CountdownProps {
  from: number;
}

class Countdown extends React.Component<CountdownProps, CountdownState> {
```

Alter all instances of hard-coded values with `this.props.from`

And finally pass through the children of this component once the countdown has completed:

```
  render() {
    return <div className='countdown'>
      { !this.state.active && <h2>{ this.state.timeRemaining }</h2> }
      { this.state.active && this.props.children }
    </div>
  }
```

## Further reading

[React Component lifecycle](https://facebook.github.io/react/docs/react-component.html)

[Introduction to Webpack](https://webpack.js.org/concepts/)