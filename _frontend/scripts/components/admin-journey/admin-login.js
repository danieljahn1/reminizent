import React, { Component } from 'react';

class AdminLogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
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
                                        <input type="text" className="form-control input1" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="text" className="form-control input1" />
                                    </div>

                                </form>

                                <div className="row">
                                    <button className="btn col-md-6 col-md-offset-3">Sign In</button>
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