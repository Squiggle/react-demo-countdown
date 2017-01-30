import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../styles/App.scss';

import Countdown from './Countdown';

const App = () =>
  <div>
    <Countdown from={10}>
      <h2>Ta-dah!</h2>
    </Countdown>
  </div>

ReactDOM.render(
  <App />,
  document.getElementById('content')
);