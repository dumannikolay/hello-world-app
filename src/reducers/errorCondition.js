
const errors = {
    firstLoadError: {
        state: false,
        text: ''
    },
    updateStorageError: {
        state: false,
        text: ''
    },
    emptyFilmTitleError: {
        state: false,
        text: 'This field can not be empty'
    },
    emptyFilmStarsError: {
        state: false,
        text: 'This field can not be empty'
    },
    loadBadFileError: {
        state: false,
        text: ''
    }
};



export default function errorCondition(state = errors, action) {

    switch (action.type) {
        default: return state;

        case 'FIRST_LOAD_ERROR': {
            return {...state, firstLoadError: {
                state: action.payload.state,
                text: action.payload.text
            }}
        }
        case 'ADD_EMPTY_FILM_TITLE_ERROR': {
            return {...state, emptyFilmTitleError: {
                state: action.payload.state,
                text: action.payload.text
            }}
        }
        case 'ADD_EMPTY_FILM_STARS_ERROR': {
            return {...state, emptyFilmStarsError: {
                state: action.payload.state,
                text: action.payload.text
            }}
        }
        case 'LOAD_BAD_FILE_ERROR': {
            return {...state, loadBadFileError: {
                state: action.payload.state,
                text: action.payload.text
            }}
        }
    }

}

