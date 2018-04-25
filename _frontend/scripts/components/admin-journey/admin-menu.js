import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';

import Dashboard from "./dashboard";
import CustomerDetials from "./details-customer";
import EditCustomer from "./edit-customer";
import AddCustomer from './add-customer';

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        }
    }
    toggleEdit = () => {
        this.setState((prevState) => {
            active: !prevState.active
        });
    }

    onClick(){

    }

    render() {
        return (
            <div>
                <div className="container-fluid adminMenu">
                    <div className="col-md-12">
                        <div className="row">

                            <div className="col-md-1 pull-right">
                                <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" id="userImg" />
                            </div>

                            <div className="col-md-1 dropdown pull-right">
                                <label htmlFor="userName" className="dropdown-toggle user-dropdown" data-toggle="dropdown" type="button">Users Name<span className="caret"></span></label>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">Log Out</a></li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

                {/* everything will have to be toggled from the admin menu bar components */}
                <div>
                    {/* <Dashboard active={this.state.active} />
                    <AddCustomer onClick={this.toggleEdit}/> */}
                    {/* <CustomerDetials/> */}
                    {/* <EditCustomer active={this.state.active} onClick={this.toggleEdit}/> */}
                </div>

                    <Switch>
                        <Route exact path ="/" render={() =><Dashboard/>}/>
                        <Route exact path ="/add-customer" component={AddCustomer}/>
                        <Route exact path ="/details-customer" render={() =><CustomerDetials/>}/>
                        <Route exact path ="/edit-customer" render={() =><EditCustomer/>}/>

                    </Switch>

            </div>
        )
    }

}

export default AdminMenu;