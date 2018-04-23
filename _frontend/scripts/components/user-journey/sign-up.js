import React, { Component } from 'react';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2 admin-login">

                    <div className="row login-form">
                        <div className="col-md-4 col-md-offset-4 text-center">
                            <h3>Sign Up</h3>
                        </div>

                        <div className="col-md-4 col-md-offset-1">
                            <form className="form-inline" >

                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" className="form-control input1" />
                                    <label htmlFor="lastName">E-mail:</label>
                                    <input type="text" className="form-control input1" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Comany:</label>
                                    <input type="text" className="form-control input1" />

                                    <label htmlFor="" className="input1">Referal Type</label>
                                    <br/>
                                    <select className="form-control">
                                        <option>TV</option>
                                        <option>Radio</option>
                                        <option>Internet</option>
                                        <option>Walk-in</option>
                                        <option>Rereral</option>
                                    </select>
                                </div>

                            </form>
                        </div>
                        
                        <div className="col-md-4 col-md-offset-1">
                            <form className="form-inline" >

                                <div className="form-group">
                                    <label htmlFor="firstName">Last Name:</label>
                                    <input type="text" className="form-control input1" />
                                    <label htmlFor="lastName">Phone Number:</label>
                                    <input type="text" className="form-control input1" />
                                </div>

                                <div className="form-group">

                                    <label htmlFor="email">Intrest:</label>
                                    <br/>
                                    <select className="form-control">
                                        <option>General Information</option>
                                        <option>Loan Information</option>
                                        <option>Speak with an Agent</option>
                                        <option>Market Trends</option>
                                    </select>

                                   <label htmlFor="" className="input1">Name of Referal</label>
                                    <input className="form-control" type="text" placeholder="" />
                                </div>

                            </form>
                        </div>


                        <div className="row">
                                <button className="btn col-md-6 col-md-offset-3">Sign Up</button>
                            </div>
                    </div>


                </div>
            </div>
        </div>
         )
    }
}
 
export default SignUp;