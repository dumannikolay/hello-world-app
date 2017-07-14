import fetch from 'isomorphic-fetch'
import {getFilmList} from "./fetchFilmList"

export const deleteFilmFromList = (id) => dispatch => {

    let filmId = {
        id: id
    };

    let jsonFilm = JSON.stringify(filmId);
    fetch('http://localhost:8080/api/deleteFilmFromList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonFilm
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json()
    }).then(function (response) {
        if (response.result === 'ok') dispatch(getFilmList())
    })
};
