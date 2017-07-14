import React, {Component} from 'react';
import StartMenu from './StartMenu'
import MainMenu from  './MainMenu'
import {connect} from 'react-redux';

class MenuController extends Component {
    render() {
        return (
            this.props.store.filmList.initialState ? <MainMenu /> : <StartMenu />
        )
    }
}

export default connect(
    state => ({
        store: state
    })
)(MenuController)


