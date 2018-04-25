import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

// component imports
// Admin imports
import AdminMenu from './admin-journey/admin-menu'
import Dashboard from './admin-journey/dashboard'
import AddCustomer from './admin-journey/add-customer';
import CustomerDetails from './admin-journey/details-customer';
import EditCustomer from './admin-journey/edit-customer';
import AdminFooter from './admin-journey/admin-footer';
import AdminLogIn from './admin-journey/admin-login';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className=" body">
                <AdminMenu />
                <Switch>
                    <Route path='/admin/login' component={AdminLogIn} />
                    <Route path='/admin/dashboard' component={Dashboard} />
                    <Route path='/admin/customer' component={CustomerDetails} />
                </Switch>
                <AdminFooter />
            </div>
        )
    }
}

export default Admin