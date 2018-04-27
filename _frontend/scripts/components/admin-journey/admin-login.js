import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginToken } from '../../redux/actions';
import { setAdminLogin } from '../../redux/actions';
import axios from 'axios';

class AdminLogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            adminLoginToken: '',
            redirect: false
        }
    }

    adminLogin(e) {
        e.preventDefault();
        if (this.state.emailAddress != '' && this.state.password != '') {
            var body = {
                "Email": this.state.email,
                "Password": this.state.password
            }
            axios.post('http://localhost:3000/admin/login', body)
                .then(response => {
                    if (response.data.message == "Here is your token.") {
                        this.setState({
                            adminLoginToken: response.data.token
                        })
                        this.props.sendTokenToRedux(this.state.adminLoginToken);
                        this.setState({
                            redirect: true
                        })

                        // Create admin object for redux
                        var adminObj = {
                            Email: response.data.email,
                            ID: response.data.id
                        }
                        this.props.sendAdminToRedux(adminObj);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.adminLogin(e);
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin-dashboard" />
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 admin-login">
                        <div className="row login-form">
                            <div className="col-md-4 col-md-offset-4 text-center">
                                <h3>Log In</h3>
                            </div>
                            <div className="col-md-6 col-md-offset-3">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="Email">Email:</label>
                                        <input type="text" className="form-control input1" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control input1" onKeyDown={this.onEnterPress} value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                                    </div>
                                </form>
                                <div className="row">
                                    <button type="submit" className="btn col-md-6 col-md-offset-3" onClick={this.adminLogin.bind(this)}>Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendTokenToRedux: adminLoginToken => dispatch(setLoginToken(adminLoginToken)),
        sendAdminToRedux: adminObject => dispatch(setAdminLogin(adminObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogIn);