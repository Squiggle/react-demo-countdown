import * as React from 'react';
import * as Rx from 'rxjs';

interface CountdownProps {
  from: number;
}

interface CountdownState {
  timeRemaining?: number;
  active: boolean;
}

class Countdown extends React.Component<CountdownProps, CountdownState> {

  private timerSubscription : Rx.Subscription;

  constructor(props: any) {
    super(props);
    this.state = {
      timeRemaining: this.props.from,
      active: false
    };
  }

  componentDidMount() {
    // Reactive Extensions
    // Use an observable interval that emits every second
    const observable = Rx.Observable
      .interval(1000) // every second
      .timeInterval()  // take the time intervale
      .take(this.props.from) // up to a maximum of [seconds]

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

  tick = (timeElapsed: Rx.TimeInterval<number>) => {
    this.setState({
      active: false,
      timeRemaining: this.props.from - timeElapsed.value - 1
    });
  }

  timerComplete = () => {
    this.setState({
      active: true
    });
  }

  render() {
    return <div className='countdown'>
      { !this.state.active && <h2>{ this.state.timeRemaining }</h2> }
      { this.state.active && this.props.children }
    </div>
  }
}

export default Countdown;