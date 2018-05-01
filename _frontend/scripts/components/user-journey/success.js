import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Success extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 admin-login">
                            <div className="row login-form">
                                <div className="col-md-6 col-md-offset-3 text-center userMenu">
                                    <h1>Thank You!</h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3 text-center">
                                        <p className="form-spacing5">Please check your email to confirm your registration.</p>
                                    </div>
                                </div>
                                <div className="row in-line11">
                                    <Link to="/"><button className="btn col-md-3 col-md-offset-4 form-spacing4">Return to the main menu</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Success;
