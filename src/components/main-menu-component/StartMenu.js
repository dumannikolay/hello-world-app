import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu, Button, Popup, Message} from 'semantic-ui-react'
import {getFilmList} from '../../actions/fetchFilmList'

class StartMenu extends Component {
    render() {
        return (
            <Menu fixed="top">
                <Menu.Item>
                    <Popup
                        trigger={
                            <Button
                                size='small'
                                onClick={this.props.onGetFilmList}
                            > Load Films </Button>
                        }
                        content={
                            <Message color='red'>
                                {`Error while retrieving data from API service with:
                                    "${this.props.store.errorCondition.firstLoadError.text}".
                                    Please check the availability of the API service at http://localhost:8080/api`}
                            </Message>}
                        open={this.props.store.errorCondition.firstLoadError.state}
                        onClose={this.props.onFirstErrorClose}
                        position='bottom center'
                        basic={true}
                        style={{padding: '0px', border: 'none'}}
                    />
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onGetFilmList: () => {
            dispatch(getFilmList())
        },
        onFirstErrorClose: () => {
            dispatch({
                type: 'FIRST_LOAD_ERROR', payload: {
                    state: false, text: ''
                }
            })
        },
    })
)(StartMenu);