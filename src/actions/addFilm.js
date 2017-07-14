import fetch from 'isomorphic-fetch'
import {getFilmList} from "./fetchFilmList"

export const addFilmToList = (newFilm) => dispatch => {
    let jsonFilm = JSON.stringify(newFilm);
    fetch('http://localhost:8080/api/addFilmToList', {
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
