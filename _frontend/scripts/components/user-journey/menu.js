import React, { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }a
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 userMenu">

                        <div className="col-md-4"> 
                        <h1 className="company-header"> Reminizent</h1>
                        </div>
                        <div className="col-md-1 col-md-offset-7 log-in-btn "><button className="btn pull-right">Log In</button></div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;