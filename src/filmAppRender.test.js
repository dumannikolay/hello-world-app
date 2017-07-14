import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import FilmsList from './components/film-list-component/FilmList';
import MenuController from './components/main-menu-component/MenuController'
import reducer from './reducers'

const store = createStore(reducer);

it('Render Menu', () => {
    let div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
          <MenuController />
        </Provider>
        , div);
});

it('Render FilmsList', () => {
  let div = document.createElement('div');
  ReactDOM.render(
      <Provider store={store}>
      <FilmsList />
      </Provider>
      , div);
});





