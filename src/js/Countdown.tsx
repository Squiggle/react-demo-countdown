import * as React from 'react';
import * as Rx from 'rxjs';

interface CountdownState {
  TimeRemaining?: number;
  Active: boolean;
}

class Countdown extends React.Component<any, CountdownState> {

  private readonly seconds: number = 5;
  private timerSubscription : Rx.Subscription;

  constructor(props: any) {
    super(props);
    this.state = {
      TimeRemaining: this.seconds,
      Active: false
    };
  }

  componentDidMount() {
    // Reactive Extensions
    // Use an observable interval that emits every second
    const observable = Rx.Observable
      .interval(1000) // every second
      .timeInterval()  // take the time intervale
      .take(this.seconds) // up to a maximum of [seconds]

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

  tick(timeElapsed: Rx.TimeInterval<number>) {
    this.setState({
      Active: false,
      TimeRemaining: this.seconds - timeElapsed.value - 1
    });
  }

  timerComplete() {
  }

  render() {
    return <div className='countdown'>
      { !this.state.Active && <h2>Countdown: { this.state.TimeRemaining }</h2> }
      { this.state.Active && <h2>Complete!</h2> }
    </div>

  }
}

export default Countdown;