import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/Main'
import Publish from './components/Publish'
import { Router, Route, browserHistory ,IndexRoute} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
//根据环境配置axios的baseurl
axios.defaults.baseURL = process.env.NODE_ENV==='development'?'http://localhost:3003/api/':'http://120.78.220.105:3003/api/'
console.log(axios.defaults.baseURL)
ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path='/' >
			<IndexRoute component={Main}></IndexRoute>
			<Route path="login" component={App}/>
			<Route path="main" component={Main}/>
			<Route path="publish" component={Publish}/>
		</Route>
	</Router>), document.getElementById('root')
);
registerServiceWorker();
