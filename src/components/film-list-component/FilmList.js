import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Icon, Popup, Button, Divider} from 'semantic-ui-react'
import {deleteFilmFromList} from '../../actions/deleteFilm'

class FilmsList extends Component {

    onDeleteFilm = (id) => {
        this.props.onDeleteFilm(id);
    };

    render() {
        let init = this.props.store.filmList.initialState;
        let displayed = this.props.store.filmList.displayedFilms;
        let list = displayed ? displayed : init;
        return (
            <div>
                <Divider horizontal> </Divider>
                <Divider horizontal> </Divider>
                <Divider horizontal> </Divider>
                <Divider horizontal> </Divider>
                <List selection verticalAlign='middle'>
                    {
                        list.map((el) =>
                            <List.Item key={el.id}>
                                <Popup
                                    trigger={
                                        <Icon size='large' circular name='info'/>}
                                    content={
                                        <div>
                                            <List>
                                                <List.Content>
                                                    <List.Header>Year: {el.year}</List.Header>
                                                    <List.Header>Format: {el.format}</List.Header>
                                                    <List.Header>ID: {el.id}</List.Header>
                                                </List.Content>
                                            </List>
                                            <Button
                                                size='small'
                                                color='red'
                                                onClick={ () => this.onDeleteFilm(el.id) }
                                            >Delete film</Button>
                                        </div>
                                    }
                                    position='bottom left'
                                    size="large"
                                    on='click'
                                />
                                <List.Content>
                                    <List.Header>{el.title}</List.Header>
                                    <List.Description>{el.stars}</List.Description>

                                </List.Content>
                            </List.Item>
                        )
                    }
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onDeleteFilm: (id) => {
            dispatch(deleteFilmFromList(id))
        }
    })
)(FilmsList);
