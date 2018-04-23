import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

// component imports
// user imports
import Menu from './user-journey/menu'
import AdminLogIn from './user-journey/admin-login'
import SignUp from './user-journey/sign-up'
// Admin imports
import AdminMenu from './admin-journey/admin-menu'
import Dashboard from './admin-journey/dashboard'
import AddCustomer from './admin-journey/add-customer';
import CustomerDetails from './admin-journey/details-customer';
import EditCustomer from './admin-journey/edit-customer';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div>
            <Menu/>
            {/* <AdminLogIn/> */}
            <SignUp/>
            {/* <AdminMenu>
                <Dashboard/>
                <AddCustomer/>
                <CustomerDetails/>
                <EditCustomer/>
            </AdminMenu> */}
            </div>
        )
    }
}
 
export default Container