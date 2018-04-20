import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

// component imports
import AdminMenu from './admin-journey/admin-menu'


class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="container-fluid">
            <AdminMenu/>
            </div>
        )
    }
}
 
export default Container