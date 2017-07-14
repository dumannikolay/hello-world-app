import fetch from 'isomorphic-fetch'
import {getFilmList} from "./fetchFilmList"

export const onLoadFromFile = (file) => dispatch => {

    const disableMsg = () => setTimeout(() => {
            dispatch({
                type: 'LOAD_BAD_FILE_ERROR',
                payload: {
                    state: false,
                    text: ''
                }
            });
        }, 3000);


    if (!file) {
        dispatch({
            type: 'LOAD_BAD_FILE_ERROR',
            payload: {
                state: true,
                text: 'Please select a file'
            }
        });
        disableMsg()
    } else if (file.size > 512000) {
        dispatch({
            type: 'LOAD_BAD_FILE_ERROR',
            payload: {
                state: true,
                text: 'Your file is too large. The maximum allowed size is 0.5MB'
            }
        });
        disableMsg()
    } else {
        const formData = new FormData();
        formData.append('file', file);
        const requestOptions = {
            method: 'POST',
            body: formData,
        };
        fetch('http://localhost:8080/api/loadFomFile', requestOptions).then(function (response) {
            if (response.status >= 400) {
                dispatch({
                    type: 'LOAD_BAD_FILE_ERROR',
                    payload: {
                        state: true,
                        text: 'API error loading file ' + response.status
                    }
                });
                disableMsg()
            }
            return response.json()
        }).then(function (response) {
            if (response.loadedFilmsCount <= 0) {
                dispatch({
                    type: 'LOAD_BAD_FILE_ERROR',
                    payload: {
                        state: true,
                        text: 'No movies have been uploaded. Possible error in the document format'
                    }
                });
                disableMsg()
            }
            if (response.result === 'ok') {
                dispatch(getFilmList())
            }
        }).catch(function (error) {
            dispatch({
                type: 'LOAD_BAD_FILE_ERROR',
                payload: {
                    state: true,
                    text: 'API error loading file ' + error
                }
            });
            disableMsg()
        })
    }

};
