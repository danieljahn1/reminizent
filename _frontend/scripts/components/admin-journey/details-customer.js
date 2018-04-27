import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setCustomerObject } from '../../redux/actions';
import axios from 'axios';

import NoteEntry from './note-entry';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            customer: '',
            notes: '',
            redirectToEdit: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/activity/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken)
            .then(response => {

                this.setState({
                    activity: response.data[0],
                    customer: this.props.viewCustomer  // sending redux state to local, so it does not error upon the logout.
                })

            })
    }

    render() {
        const { redirectToEdit } = this.state;
        if (redirectToEdit) {
            return <Redirect to="/edit-customer" />
        }

        return (

            <div className="container-fluid">
                <div className="col-md-10  col-md-offset-1 ">
                    <div className="container-fluid customerDetailsPage" style={{ paddingRight: 20 }}>
                        <div className="container">
                            <div className="row">
                                <h2 style={{ margin: 20 }}>Customer Details</h2>
                            </div>

                            <table className="col-md-12 form-spacing4">
                                <tbody>
                                    {/* update customer/axios delete/call will need token go to "admin-customer" page */}
                                    {/* creating the using sends its to redux. this call on did mount needs to grab by id */}
                                    <tr>

                                        <th className="input2">First Name:</th>
                                        <td>{this.state.customer.FirstName}</td>
                                        <th className="input1">Last Name:</th>
                                        <td>{this.state.customer.LastName}</td>
                                        <th className="input1">E-mail:</th>
                                        <td>{this.state.customer.Email}</td>
                                        <th className="input1">Phone Numer:</th>
                                        <td>{this.state.customer.Phone}</td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <th className="input1">Sign Up Date:</th>
                                        <td>
                                            {this.state.activity.DateCreated != undefined &&
                                                (
                                                    this.formatDate(this.state.activity.DateCreated)
                                                )
                                            }
                                        </td>
                                        <th className="input1">Sign Up Source:</th>
                                        <td>{this.state.activity.Source}</td>

                                        <th className="input2">Company:</th>
                                        <td>{this.state.customer.Company}</td>
                                        <th className="input1">Interest:</th>
                                        <td>{this.state.customer.AreaOfInterest}</td>

                                    </tr>
                                    <br />

                                    <tr>
                                        <th className="input2">Referral Type:</th>
                                        <td>{this.state.customer.HeardAbout}</td>
                                        <th className="input1">Name of Referral:</th>
                                        <td>{this.state.customer.Referral}</td>

                                        <th className="input1">Application Status:</th>
                                        <td>{this.state.customer.ApplicationStatus}</td>
                                        <th className="input1">Loan Status:</th>
                                        <td>{this.state.customer.LoanStatus}</td>
                                    </tr>
                                    <br />

                                </tbody>
                            </table>

                            {/* Edit button-- toggle page to edit form */}

                            <div className="row" style={{ margin: 10 }}>
                                <button className="btn btn-danger col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10 }}>Delete Customer</button>
                                <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10, margin: 10 }} onClick={this.goToEditCustomer.bind(this)}>Edit Customer</button>
                                <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10 }} ><a href="#openModal">Email Customer</a></button>
                                <div id="openModal" className="modalDialog">
                                    <div>
                                        <a href="#close" title="Close" className="close">X</a>
                                        <h3>Email {this.state.customer.Email}</h3>
                                        <h1></h1>
                                        <form>
                                            <div className="form-group">
                                                {/* <label htmlFor="email-modal">Email</label> */}
                                                <select className="form-control" id="email-modal" value={this.state.customer.Email} onChange={(e) => { this.setState({ customer: e.target.value }) }} required >
                                                    <option defaultValue>Subject Line ...</option>
                                                    <option value="Thank you ..."></option>
                                                    <option value="Here's an update on your application"></option>
                                                    <option value="You've been approved"></option>
                                                </select>
                                            </div>
                                            <h1></h1>
                                            <div className="form-group">
                                                {/* <label htmlFor="email-modal">Email</label> */}
                                                <select className="form-control" id="email-modal" value={this.state.customer.Email} onChange={(e) => { this.setState({ customer: e.target.value }) }} required >
                                                    <option defaultValue>Subject Body Template ...</option>
                                                    <option value="Template 1"></option>
                                                    <option value="Template 2"></option>
                                                    <option value="Template 3"></option>
                                                </select>
                                            </div>
                                            <h1></h1>
                                            <button href="#close" type="submit" className="btn btn-block" onClick={this.emailCustomer.bind(this, this.state)}>Next</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* add note section */}
                            <NoteEntry />



                        </div>
                    </div>

                </div>
            </div >

        )
    }

    emailCustomer() {
        var emailHref = this.state.customer.Email;

    }

    goToEditCustomer() {
        this.props.sendCustomerObjToRedux(this.state.customer);
        this.setState({
            redirectToEdit: true
        })
    }

    formatDate(d) {
        // Format the date from yyyy-mm-dd into MM/dd/yyyy for display
        var year = d.substr(0, 4);
        var month = d.substr(5, 2);
        var day = d.substr(8, 2);
        var time = ''; // d.substr(11,5);

        // Convert 24 hour time to 12 hour AM/PM
        var hour = d.substr(11, 2);
        if (hour > 12) {
            // PM. Subtract 12 from the hour
            hour -= 12;
            time = hour + ":" + d.substr(14, 2) + " PM";
        }
        else if (hour == "00") {
            // 12 AM
            time = 12 + ":" + d.substr(14, 2) + " AM";;
        }
        else {
            // AM
            time = d.substr(11, 5) + " AM";
            if (time.indexOf('0') == 0) {
                // remove the leading zero
                time = time.substr(1);
            }
        }

        var date = month + '/' + day + '/' + year + " " + time;
        return date;
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        customerObject: state.customerObject,
        viewCustomer: state.viewCustomer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCustomerObjToRedux: customerObject => dispatch(setCustomerObject(customerObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);