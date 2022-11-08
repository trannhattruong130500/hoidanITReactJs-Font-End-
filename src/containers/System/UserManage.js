import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModelUser from './ModelUser';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter'
import ModelEditUser from './ModelEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
            isOpenModelEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModelUser: true,
        })
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        })
    }
    toggleUserEditModel = () => {
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModelUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            reject(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModelEditUser: false
                })
                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage)
            }
            console.log('check save user', res)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className='users-container mx-3'>
                <ModelUser
                    isOpen={this.state.isOpenModelUser}
                    toggleFromParent={this.toggleUserModel}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModelEditUser &&
                    <ModelEditUser
                        isOpen={this.state.isOpenModelEditUser}
                        toggleFromParent={this.toggleUserEditModel}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}

                    />
                }

                <div className='title text-center'>
                    Manage users
                </div>
                <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                >
                    <i className="fas fa-plus">  </i>  Add New User
                </button>
                <div className='users-table mt-3'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {
                                arrUsers && arrUsers.length && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button type="button" className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}><i className="fas fa-wrench"></i></button>
                                                <button type="button" className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}><i className="far fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
