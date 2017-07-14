import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Dropdown, Menu, Button, Icon, Popup, Message} from 'semantic-ui-react'

import {addFilmToList} from '../../actions/addFilm'
import {onLoadFromFile} from '../../actions/loadFromFile'
import {getFilmList} from '../../actions/fetchFilmList'

class MainMenu extends Component {
    render() {
        return (
            <Menu fixed="top">
                <Menu.Item>
                    <Input placeholder='Search...' onChange={this.handleSearch}
                        action={
                            <Dropdown
                                button
                                basic
                                floating
                                options={this.props.store.filmList.searchOptions}
                                placeholder='by title'
                                onChange={this.onSearchTypeSelect}
                            />
                        }
                    />
                </Menu.Item>
                <Menu.Item>
                    <Button size='mini' onClick={this.props.onSortAsc}>
                        <Icon name='sort alphabet ascending'/>
                        Asc
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button size='mini' onClick={this.props.onSortDesc}>
                        <Icon name='sort alphabet descending'/>
                        Desc
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button size='mini' onClick={this.props.onUndoSort}>
                        <Icon name='undo'/>
                        Undo sort
                    </Button>
                </Menu.Item>

                <Menu.Item>
                    <Popup trigger={<Button size='medium' icon='add'/>}
                        position='bottom left'
                        size="large"
                        on='click'
                        onClose={this.onPopupErrorClose}
                        >
                            <div>
                                <Popup
                                    trigger={<Input id="titleInput" onChange={this.handleTitle} placeholder='Title'/>}
                                    content={
                                        <Message color='red'>
                                            {`${this.props.store.errorCondition.emptyFilmTitleError.text}`}
                                        </Message>
                                    }
                                    on='click'
                                    hoverable={true}
                                    open={this.props.store.errorCondition.emptyFilmTitleError.state}
                                    size='mini'
                                    basic={true}
                                    style={{padding: '0px', border: 'none'}}
                                    position='right center'
                                />
                                <Input
                                    placeholder='Year'
                                    onChange={this.handleYear}
                                />
                                <Input
                                    placeholder='Format'
                                    onChange={this.handleFormat}
                                />
                                <Popup
                                    trigger={<Input id="starsInput" onChange={this.handleStars} placeholder='Stars'/>}
                                    content={
                                        <Message color='red'>
                                            {`${this.props.store.errorCondition.emptyFilmStarsError.text}`}
                                        </Message>
                                    }
                                    on='click'
                                    hoverable={true}
                                    open={this.props.store.errorCondition.emptyFilmStarsError.state}
                                    size='tiny'
                                    basic={true}
                                    style={{padding: '0px', border: 'none'}}
                                    position='right center'
                                />
                                <Button
                                    size='small'
                                    icon='add'
                                    onClick={this.onAddNewFilm}
                                >
                                </Button>
                            </div>
                    </Popup>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Popup
                        trigger={<div>
                            <Input
                                onChange={this.handleFile}
                                type='file'
                                action={
                                    <Button
                                        compact
                                        onClick={this.onLoadFromFile}
                                    >
                                        Load from file
                                    </Button>
                                }
                            />
                        </div>}
                        content={
                            <Message color='red'>
                                {`${this.props.store.errorCondition.loadBadFileError.text}`}
                            </Message>
                        }
                        open={this.props.store.errorCondition.loadBadFileError.state}
                        basic={true}
                        style={{padding: '0px', border: 'none'}}
                    />
                </Menu.Item>
            </Menu>
        )
    }

    newFile;
    newFilm = {};
    searchBy = {};

    onLoadFromFile = () => {
        this.props.onLoadFromFile(this.newFile)
    };

    componentDidUpdate() {
            if (document.getElementById('titleInput')) {
                document.getElementById('titleInput').click()
            }
            if (document.getElementById('starsInput')) {
                document.getElementById('starsInput').click()
            }
    }

    onFromFile() {
        this.props.onLoadFromFile(this.newFile)
    }
    onSortAsc = () => this.props.onSortAsc();
    onSortDesc = () => this.props.onSortDesc();
    onAddNewFilm = () => {
        if (!this.newFilm.stars || !this.newFilm.title) {
            if (!this.newFilm.title) {
                this.props.onEmptyFilmTitleErrorOpen();
            }
            if (!this.newFilm.stars) {
                this.props.onEmptyFilmStarsErrorOpen();
            }
        } else {
            this.props.onEmptyFilmStarsErrorClose();
            this.props.onEmptyFilmTitleErrorClose();
            this.props.onAddNewFilm(this.newFilm);
        }
    };
    onPopupErrorClose = () => {
        this.props.onEmptyFilmStarsErrorClose();
        this.props.onEmptyFilmTitleErrorClose();
        this.popupFix = false;
    };
    onSearchTypeSelect = (e, {value}) => {
        this.searchBy.searchType = value;
        if (this.searchBy.searchQuery) {
            this.props.onSearch(this.searchBy);
        }
    };
    handleTitle = (event) => {
        this.props.onEmptyFilmTitleErrorClose();
        this.newFilm.title = event.target.value;
    };
    handleStars = (event) => {
        this.props.onEmptyFilmStarsErrorClose();
        this.newFilm.stars = event.target.value;
    };
    handleYear = (event) => this.newFilm.year = event.target.value;
    handleFormat = (event) => this.newFilm.format = event.target.value;
    handleFile = (e) => {
        this.newFile = e.target.files[0];
    };
    handleSearch = (event) => {
        this.searchBy.searchQuery = event.target.value;
        this.props.onSearch(this.searchBy);
    };

}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onSearch: (searchBy) => {
            let type = 'SEARCH_FILM_TITLE';
            if (searchBy.searchType === 'by actor') {
                type = 'SEARCH_FILM_ACTOR'
            }
            dispatch({type: type, payload: searchBy.searchQuery})
        },
        onSortAsc: () => {
            dispatch({type: 'SORT_FILM_TITLE_ASC', payload: ''})
        },
        onSortDesc: () => {
            dispatch({type: 'SORT_FILM_TITLE_DESC', payload: ''})
        },
        onUndoSort: () => {
            dispatch(getFilmList())
        },
        onAddNewFilm: (newFilm) => {
            dispatch(addFilmToList(newFilm))
        },
        onLoadFromFile: (file) => {
            dispatch(onLoadFromFile(file))
        },
        onEmptyFilmTitleErrorClose: () => {
            dispatch({
                type: 'ADD_EMPTY_FILM_TITLE_ERROR', payload: {
                    state: false,
                    text: ''
                }
            })
        },
        onEmptyFilmTitleErrorOpen: () => {
            dispatch({
                type: 'ADD_EMPTY_FILM_TITLE_ERROR', payload: {
                    state: true,
                    text: 'Please, enter film title'
                }
            })
        },
        onEmptyFilmStarsErrorClose: () => {
            dispatch({
                type: 'ADD_EMPTY_FILM_STARS_ERROR', payload: {
                    state: false,
                    text: ''
                }
            })
        },
        onEmptyFilmStarsErrorOpen: () => {
            dispatch({
                type: 'ADD_EMPTY_FILM_STARS_ERROR', payload: {
                    state: true,
                    text: 'Please, enter film stars'
                }
            })
        }
    })
)(MainMenu)