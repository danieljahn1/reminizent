import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Dashboard from "./dashboard";
import CustomerDetials from "./details-customer";
import EditCustomer from "./edit-customer";

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }
    toggleEdit = () => {
        this.setState((prevState) => {
            active: !prevState.active
        });
    }
    // https://react-bootstrap.github.io/components/dropdowns/
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
                                <label htmlFor="userName" className="dropdown-toggle" data-toggle="dropdown" type="button">Users Name<span className="caret"></span></label>
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
                    <Dashboard active={this.state.active}/>
                    {/* <CustomerDetials active={this.state.active} onClick={this.toggleEdit}/>
                    <EditCustomer active={this.state.active} onClick={this.toggleEdit}/> */}
                </div>
            </div>
        )
    }

}

export default AdminMenu;