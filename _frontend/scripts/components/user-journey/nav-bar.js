import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';      



class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return ( 
            <div className="myNav">
                <div className="h1Container">
                <h1>Reminizent</h1>
                </div>
                <div className="loginContainer">
                    <a href="#">Login</a>
                </div>
            </div>
         )
    }
}
 
export default Navbar;