import { combineReducers } from 'redux';
import filmList from './searchSortFetch'
import errorCondition from './errorCondition'

export default combineReducers({
    filmList,
    errorCondition
})
