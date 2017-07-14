import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';


import './index.css';
import FilmsList  from './components/film-list-component/FilmList';
import MenuController from './components/main-menu-component/MenuController';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <MenuController />
    </Provider>,
    document.getElementById('MainMenu'));
ReactDOM.render(
    <Provider store={store}>
        <FilmsList />
    </Provider>,
    document.getElementById('ContactList'));


registerServiceWorker();
