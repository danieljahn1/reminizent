import React, { Component } from 'react';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                                    <p className="form-spacing5">Please check your e-mail for confirmation.</p>
                                </div>
                                </div>                            


                                <div className="row"style={{marginLeft:41}}>
                                    <button className="btn col-md-3 col-md-offset-4 form-spacing4">Retrun to main menu</button>
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