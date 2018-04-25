import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class AdminLogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
                    this.setState({
                        redirect: true
                    })
                    console.log(response);
                })
                .catch(err => {
                    console.log(err)
                })
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
                                        <input type="password" className="form-control input1" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} required />
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

export default AdminLogIn;