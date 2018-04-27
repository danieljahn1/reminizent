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
            addNoteDate: this.dateInputFormat(),
            addNoteContactMethod: 'Select ...',
            addNoteMessage: '',
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

        // axios.get('http://localhost:3000/contactactivity/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken)
        //     .then(response => {
        //         console.log(response.data);
        //         // this.setState({                    
        //         //     notes: response.data[0],
        //         //     // customer: this.props.viewCustomer  // sending redux state to local, so it does not error upon the logout.
        //         // })

        //     })
    }

    dateInputFormat() {
        // Returns the date in "yyyy-MM-ddThh:mm" format to populate the default current date value in the datetime control
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
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
                                <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10, margin: 10 }} onClick={this.goEditCustomer.bind(this)}>Edit Customer</button>
                                <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10 }}>Email Customer</button>

                            </div>

                            {/* add note section */}
                            <div className="row">
                                <div className="container">
                                    <div className="row">
                                        <h2 style={{ margin: 20 }}>Add New Note</h2>
                                    </div>

                                    <div className="row row-spacing" >
                                        <div className="form-inline col-md-10">
                                            <label htmlFor="" className="input2">Date</label>
                                            <input className="form-control" type="datetime-local" id="datePicker" value={ this.state.addNoteDate } onChange={ (e) => { this.setState({ addNoteDate: e.target.value }) } } />
                                            <label htmlFor="" className="input1">Method of Contact</label>
                                            <select className="form-control" value={ this.state.addNoteContactMethod } onChange={ (e) => { this.setState({ addNoteContactMethod: e.target.value }) } } >
                                                <option defaultValue>Select ...</option>
                                                <option>Email</option>
                                                <option>Phone</option>
                                                <option>In Person</option>
                                            </select>
                                        </div>
                                    </div>

                                    <label htmlFor="">Notes</label>
                                    <div className="row row-spacing">
                                        <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5" value={ this.state.addNoteMessage } onChange={ (e) => { this.setState({ addNoteMessage: e.target.value }) } } ></textarea>
                                    </div>

                                    <div className="row" style={{ margin: 10, paddingBottom: 10 }}>
                                        <button className="btn col-md-2 input1 input2 pull-right" onClick={ this.submitNote.bind(this) }>Submit</button>
                                        <Link to="/admin-customer"> <button className="btn col-md-2 input1 input2 pull-right">Submit</button></Link>
                                    </div>
                                </div>
                            </div>


                            {/* note history section */}
                            <div className="row">
                                <div className="container">
                                    <div className="col-md-12 table-responsive">
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th className="col-md-1">Date</th>
                                                    <th className="col-md-2">Method of Contact</th>
                                                    <th className="col-md-2">Created by</th>
                                                    <th className="col-md-5">Note</th>
                                                    <th className="col-md-2"></th>
                                                </tr>
                                            </thead>


                                            <NoteEntry />

                                        </table>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>

                </div>
            </div>

        )
    }

    submitNote(e) {
        // Add the contact note

        var contactActivity = {
            AdminID: 3,  // Need to get this from the login message
            CustomerID: this.state.customer.ID,
            DateContacted: this.datePutFormat(this.state.addNoteDate),
            ContactMethod: this.state.addNoteContactMethod,
            ContactMessage: this.state.addNoteMessage
        }
        console.log(contactActivity);

        // Make sure a date, contact method and message are entered
        if (this.state.addNoteDate == "") {
            alert("Please select a date.");
        }
        else if (this.state.addNoteContactMethod == "Select ...") {
            alert("Please select a method of contact.");
        }
        else if (this.state.addNoteMessage == "") {
            alert("Please select a message.");
        }
        else {
            // All fields filled in. Proceed with the insert
            axios.post('http://localhost:3000/contactactivity/?token=' + this.props.adminLoginToken, contactActivity)
            .then(response => {
                console.log(response);
            })

            // Clear the form
            this.setState({
                addNoteDate: this.dateInputFormat(),
                addNoteContactMethod: 'Select ...',
                addNoteMessage: ''
            });
        }
        
    }

    datePutFormat(putDate) {
        // Returns the date in "yyyy-MM-dd hh:mm:ss" format for use in the put route (to insert into sql server)
        putDate = now.replace("T", " ");
        return putDate + ":00";
    }



    goEditCustomer() {
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
        else if (hour == "00"){
            // 12 AM
            time = 12 + ":" + d.substr(14,2) + " AM";;
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