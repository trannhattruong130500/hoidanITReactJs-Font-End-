import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'


class ModelUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount = () => {

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing paramater: ' + arrInput[i])
                break;
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }
    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'model-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Add new user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input className='input-content' type='email'
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input className='input-content' type='password'
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}></input>
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input className='input-content' type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}></input>
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input className='input-content' type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input className='input-content' type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='btn px-3' onClick={() => this.handleAddNewUser()}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='btn px-3' onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
