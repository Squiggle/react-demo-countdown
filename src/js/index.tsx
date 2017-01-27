import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loadTheme } from '@microsoft/load-themed-styles';

import '../styles/App.scss';

const App = () =>
  <div className='app ms-font-su'>
    <h1>Hello, World!</h1>
  </div>

ReactDOM.render(
  <App />,
  document.getElementById('content')
);