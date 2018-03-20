import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/Main'
import Publish from './components/Publish'

import { Router, Route, browserHistory ,IndexRoute} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path='/' >
			<IndexRoute component={Main}></IndexRoute>
			<Route path="login" component={App}/>
			<Route path="publish" component={Publish}/>
		</Route>
	</Router>), document.getElementById('root')
);
registerServiceWorker();
