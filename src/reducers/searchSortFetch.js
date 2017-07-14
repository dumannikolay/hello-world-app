const init = {
    initialState: undefined,
    displayedFilms: [],
    searchOptions: [
        {
            key: 'by title',
            text: 'by title',
            value: 'by title'
        },
        {
            key: 'by actor',
            text: 'by actor',
            value: 'by actor'
        }
    ]
};

function sortObj(ls, key, revers) {
    function compareAsc(a, b) {
        a = a[key];
        b = b[key];
        let type = (typeof(a) === 'string' ||
        typeof(b) === 'string') ? 'string' : 'number';
        let result;
        if (type === 'string') result = a.localeCompare(b);
        else result = a - b;
        return result;
    }

    function compareDesc(a, b) {
        a = a[key];
        b = b[key];
        let type = (typeof(a) === 'string' ||
        typeof(b) === 'string') ? 'string' : 'number';
        let result;
        if (type === 'string') result = b.localeCompare(a);
        else result = b - a;
        return result;
    }

    if (revers) {
        return ls.sort(compareDesc);
    } else {
        return ls.sort(compareAsc);
    }
}

export default function filmList(state = init, action) {
    switch (action.type) {
        default:
            return state;
        case 'SEARCH_FILM_TITLE': {
            let displayedFilms = state.initialState.filter((el) => {
                let searchValue = el.title.toUpperCase();
                return searchValue.indexOf(action.payload.toUpperCase()) !== -1;
            });
            return {...state, displayedFilms: displayedFilms};
        }
        case 'SEARCH_FILM_ACTOR': {
            let displayedFilms = state.initialState.filter((el) => {
                let searchValue = el.stars.toUpperCase();
                return searchValue.indexOf(action.payload.toUpperCase()) !== -1;
            });
            return {...state, displayedFilms: displayedFilms};
        }
        case 'SORT_FILM_TITLE_ASC': {
            let displayedFilms = sortObj(state.initialState, 'title');
            return {...state, displayedFilms: displayedFilms};
        }
        case 'SORT_FILM_TITLE_DESC': {
            let displayedFilms = sortObj(state.initialState, 'title', true);
            return {...state, displayedFilms: displayedFilms};
        }
        case 'FETCH_FILM_LIST': {
            return {...state, displayedFilms: action.payload, initialState: action.payload};
        }
    }
}





