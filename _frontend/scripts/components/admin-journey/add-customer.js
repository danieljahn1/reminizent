import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCustomerObject } from '../../redux/actions';
import axios from 'axios';
// import { setViewCustDetails } from '../../redux/actions';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            companyName: '',
            requestType: '',
            referralType: '',
            referralName: '',
            applicationStatus: '',
            loanStatus: '',
            customerObject: '',
            redirect: false
        }
    }

    userSignUp(e) {
        e.preventDefault();
        if (this.state.emailAddress != '' && this.state.firstName != '' && this.state.lastName != '') {
            var customerBody = {
                "FirstName": this.state.firstName,
                "LastName": this.state.lastName,
                "Company": this.state.companyName,
                "Email": this.state.emailAddress,
                "Phone": this.state.phoneNumber,
                "AreaOfInterest": this.state.requestType,
                "HeardAbout": this.state.referralType,
                "Referral": this.state.referralName
            }
            axios.post('http://localhost:3000/customer', customerBody)
                .then(response => {
                    var activityBody = {
                        "CustomerID": response.data[0].ID,
                        "DateCreated": new Date,
                        "DateLastContacted": new Date,
                        "Source": "OGI Rep"
                    }
                    this.setState({
                        customerObject: response.data[0]
                    })
                    this.props.sendCustomerObjToRedux(this.state.customerObject);
                    // this.props.sendCustomerToRedux(this.state.customerObject);
                    // console.log("custobj")
                    // console.log(response.data[0])
                    axios.post('http://localhost:3000/activity', activityBody)
                        .then(response => {
                            var subscribeBody = {
                                "email_address": this.state.emailAddress,
                                "status": 'subscribed',
                                "merge_fields": {
                                    "FNAME": this.state.firstName,
                                    "LNAME": this.state.lastName,
                                    "PHONE": this.state.phoneNumber,
                                    "COMPANY": this.state.companyName,
                                    "REQUEST": this.state.requestType,
                                    "REFERRAL": this.state.referralType,
                                    "REFERREDBY": this.state.referralName
                                }
                            }
                            axios.post('http://localhost:3000/subscriptions', subscribeBody)
                                .then(response => {
                                    this.setState({
                                        redirect: true
                                    })
                                    console.log(response)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                })
        }
    }

    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.userSignUp(e);
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin-customer/" />
        }

        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-10 col-md-offset-1 editCustomerPage">
                        <div className="container">
                            <div className="row">
                                <h2 className="heading1">Add New Customer</h2>
                            </div>
                            <div className="form-group">
                                <div className="row row-spacing">
                                    <div className="form-inline col-md-10">
                                        <input className="form-control input2" type="text" placeholder="First Name" value={this.state.firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                        <input className="form-control input1" type="text" placeholder="Last Name" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                        <input className="form-control input1" type="email" placeholder="Email Address" value={this.state.emailAddress} onChange={(e) => { this.setState({ emailAddress: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                        <input className="form-control input1" type="text" placeholder="Phone Number" value={this.state.phoneNumber} onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                    </div>
                                </div>
                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <input className="form-control input2" type="text" placeholder="Company" value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                        <label htmlFor="email" className="input1">Intrest</label>
                                        <select className="form-control" value={this.state.requestType} onChange={(e) => { this.setState({ requestType: e.target.value }) }}>
                                            <option defaultValue>Intrest ...</option>
                                            <option>General Information</option>
                                            <option>Loan Information</option>
                                            <option>Speak with an Agent</option>
                                            <option>Market Trends</option>
                                        </select>
                                        <label htmlFor="" className="input1">Referral Type</label>
                                        <select className="form-control" value={this.state.referralType} onChange={(e) => { this.setState({ referralType: e.target.value }) }}>
                                            <option defaultValue>Referral Type ...</option>
                                            <option>TV</option>
                                            <option>Radio</option>
                                            <option>Internet</option>
                                            <option>Walk-in</option>
                                            <option>Referral</option>
                                        </select>
                                        <label htmlFor="" className="input1">Name of Referal</label>
                                        <input className="form-control" type="text" placeholder="Name of Referal" value={this.state.referralName} onChange={(e) => { this.setState({ referralName: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                    </div>
                                </div>
                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <label htmlFor="" className="input1">Application Status</label>
                                        <select className="form-control" value={this.state.applicationStatus} onChange={(e) => { this.setState({ applicationStatus: e.target.value }) }}>
                                            <option defaultValue>Application Status ...</option>
                                            <option>Purchase only</option>
                                            <option>Looking</option>
                                            <option>Application for Pre-Qualified</option>
                                            <option>Application for Pre-Approval</option>
                                            <option>Looking - Pre-Qualified</option>
                                            <option>Looking - Pre-Approved</option>
                                            <option>In Contract</option>
                                        </select>
                                        <label htmlFor="" className="input1">Loan Status</label>
                                        <select className="form-control" value={this.state.loanStatus} onChange={(e) => { this.setState({ loanStatus: e.target.value }) }}>
                                            <option defaultValue>Loan Status ...</option>
                                            <option>Application</option>
                                            <option>Initial Documents</option>
                                            <option>Setup / Initial Disclosures</option>
                                            <option>Upfront Underwriting</option>
                                            <option>Processing</option>
                                            <option>Final Underwrite</option>
                                            <option>Closing</option>
                                            <option>Closed</option>
                                            <option>Withdrawn</option>
                                            <option>Denied</option>
                                            <option>Suspended</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row inline6">
                                    <button type="submit" className="btn col-md-2 col-md-offset-10" onClick={this.userSignUp.bind(this)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCustomerObjToRedux: customerObject => dispatch(setCustomerObject(customerObject))
        // sendCustomerToRedux: customerObject => dispatch(setViewCustDetails(customerObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
