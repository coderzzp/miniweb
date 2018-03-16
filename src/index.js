import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/Main'
import Publish from './components/Publish'
import { Router, Route, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path="/login" component={App}/>
		<Route path="/main" component={Main}/>
		<Route path="/publish" component={Publish}/>
	</Router>), document.getElementById('root')
);
registerServiceWorker();
