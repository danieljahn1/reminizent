import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Navbar from './user-journey/nav-bar'

// component imports
// user imports
import Menu from './user-journey/menu'
import SignUp from './user-journey/sign-up'
import Success from './user-journey/success'
import Jumbotron from './user-journey/jumbotron';
import MainFooter from './user-journey/footer';
import LearnMore from './user-journey/learn-more';
// Admin imports
import Admin from './Admin'
import AdminMenu from './admin-journey/admin-menu'
import Dashboard from './admin-journey/dashboard'
import AddCustomer from './admin-journey/add-customer';
import CustomerDetails from './admin-journey/details-customer';
import EditCustomer from './admin-journey/edit-customer';
import AdminFooter from './admin-journey/admin-footer';
import AdminLogIn from './admin-journey/admin-login';
import NewNote from './admin-journey/notes';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className=" body">
                <Menu />
                <Switch>
                    <Route exact path='/' component={Jumbotron} />
                    <Route path='/subscribe' component={SignUp} />
                    <Route path='/welcome' component={Success} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/admin-login' component={AdminLogIn} />
                    <Route path='/admin-dashboard' component={Dashboard} />
                    <Route path='/admin-customer' component={CustomerDetails} />
                    <Route path='/admin-subscribe' component={AddCustomer} />
                    <Route path='/edit-customer' component={EditCustomer} />
                    <Route path='/notes' component={NewNote} />
                    <Route path='/learn-more' component={LearnMore} />
                </Switch>
                <MainFooter />
            </div>
        )
    }
}

export default Container;
