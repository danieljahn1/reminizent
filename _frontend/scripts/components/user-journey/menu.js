import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }a
    render() {
        return (
            <div className="body">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 userMenu">

                        <div className="col-md-4"> 
                        <Link to="/"><h1 className="large-header"> Reminizent</h1></Link>
                        </div>
                        <Link to="admin-login"><div className="col-md-1 col-md-offset-7 log-in-btn "><button className="btn pull-right">Log In</button></div></Link>

                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Menu;