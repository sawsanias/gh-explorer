import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes';
import 'react-flexview/lib/flexView.css';
import './app.scss';
import 'buildo-normalize-css';

const router = Router.create({
  routes, location: Router.HashLocation
});

const mountNode = document.getElementById('app');

router.run(Handler => {
  ReactDOM.render(<Handler router={router} />, mountNode);
});
