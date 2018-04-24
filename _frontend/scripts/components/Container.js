import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

// component imports
// user imports
import Menu from './user-journey/menu'
import AdminLogIn from './user-journey/admin-login'
import SignUp from './user-journey/sign-up'
import Success from './user-journey/success'
import Jumbotron from './user-journey/jumbotron';
import MainFooter from './user-journey/footer';
// Admin imports
import AdminMenu from './admin-journey/admin-menu'
import Dashboard from './admin-journey/dashboard'
import AddCustomer from './admin-journey/add-customer';
import CustomerDetails from './admin-journey/details-customer';
import EditCustomer from './admin-journey/edit-customer';
import AdminFooter from './admin-journey/admin-footer';


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className=" body">
            <Menu/>
            {/* <AdminLogIn/> */}
            <SignUp/>
            {/* <Success/> */}
         
            {/* <Jumbotron/> */}
            <MainFooter/>
            
            

            {/* <AdminMenu>
                <Dashboard/>
                <AddCustomer/>
                <CustomerDetails/>
                <EditCustomer/>
            </AdminMenu>
            <AdminFooter/> */}
            </div>
        )
    }
}
 
export default Container