import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  Blog,
  Idea,
  IdeaArticle,
  Login,
  Main,
  Personal,
  Publish
} from './components/index.js'
import { Router, Route, browserHistory ,IndexRoute,IndexRedirect} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
//根据环境配置axios的baseurl
axios.defaults.baseURL = process.env.NODE_ENV==='development'?'http://localhost:3003/api/':'http://120.78.220.105:3003/api/'
ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path='/' >
			<IndexRedirect to='/main/idea'></IndexRedirect>
			<Route path="/login" component={Login}/>
			<Route path="/main" component={Main}>
				<Route path='idea' component={Idea}/>
				<Route path='personal' component={Personal}/>
				<Route path='blog' component={Blog}/>
				<Route path="idea/:id" component={IdeaArticle}/>
			</Route>
			<Route path="/publish" component={Publish}/>		
		</Route>
	</Router>), document.getElementById('root')
);
registerServiceWorker();
