import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Navbar from './user-journey/nav-bar'

// component imports
import AdminMenu from './admin-journey/admin-menu'
import Jumbotron from './user-journey/jumbotron';


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="container-fluid">
                <div className="nav-bar-div">
                    <Navbar />
                    <Jumbotron />
                </div>
            <AdminMenu/>
            </div>
        )
    }
}
 
export default Container;