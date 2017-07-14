import fetch from 'isomorphic-fetch'

export const getFilmList = () => dispatch => {
    fetch('http://localhost:8080/api/filmList')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json()
        })
        .then(function (films) {
            dispatch({type: 'FETCH_FILM_LIST', payload: films});
        }).catch(function (error) {
        dispatch({type: 'FIRST_LOAD_ERROR', payload: {state: true, text: error}})
    });
};
