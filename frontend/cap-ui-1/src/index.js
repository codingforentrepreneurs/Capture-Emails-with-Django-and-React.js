import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CaptureEmailUI from './App';
import * as serviceWorker from './serviceWorker';

const e = React.createElement
// ReactDOM.render(<App />, document.getElementById('root'));

const containers = document.querySelectorAll('.cap-ui')
containers.forEach(domContainer => {
    // render the component into the DOM
    ReactDOM.render(
      e(CaptureEmailUI, { config: domContainer.dataset}),
      domContainer
    )
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
