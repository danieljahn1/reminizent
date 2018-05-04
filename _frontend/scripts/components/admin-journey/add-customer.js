import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCustomerObject } from '../../redux/actions';
import axios from 'axios';

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
            realtorID: 1,
            realtorName: "I don't have one yet",
            applicationStatus: 'In Contact',
            loanStatus: 'Lead',
            redirect: false,
            redirectDetails: false
        }
    }

    userSignUp(e) {
        if (this.state.emailAddress != '' && this.state.firstName != '' && this.state.lastName != '') {
            e.preventDefault();
            var customerBody = {
                "FirstName": this.state.firstName,
                "LastName": this.state.lastName,
                "Company": this.state.companyName,
                "Email": this.state.emailAddress,
                "Phone": this.state.phoneNumber,
                "AreaOfInterest": this.state.requestType,
                "HeardAbout": this.state.referralType,
                "Referral": this.state.referralName,
                "RealtorID": this.state.realtorID,
                "ApplicationStatus": this.state.applicationStatus,
                "LoanStatus": this.state.loanStatus
            }
            axios.post('http://localhost:3000/customer', customerBody)
                .then(response => {
                    var activityBody = {
                        "CustomerID": response.data[0].ID,
                        "DateCreated": new Date,
                        "DateLastContacted": new Date,
                        "Source": "OGI Rep"
                    }
                    console.log(response)
                    this.props.sendCustomerObjToRedux(response.data[0]);
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
                                    "REFERREDBY": this.state.referralName,
                                    "REALTOR": this.state.realtorName,
                                    "APPSTATUS": this.state.applicationStatus,
                                    "LOANSTATUS": this.state.loanStatus
                                }
                            }
                            console.log(response)
                            axios.post('http://localhost:3000/subscriptions', subscribeBody)
                                .then(response => {
                                    this.setState({
                                        redirect: true
                                    })
                                    console.log(response)
                                })
                                .catch(err => {
                                    this.setState({
                                        redirect: true
                                    })
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

    previousPg() {
        this.setState({
            redirectDetails: true
        })
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin-customer/" />
        }

        const { redirectDetails } = this.state;
        if (redirectDetails) {
            return <Redirect to="/admin-dashboard/" />
        }
        

        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-10 col-md-offset-1 editCustomerPage">

                        <div style={{ margin: 15 }}>
                            {/* <div className="container"> */}
                            <div className="row">
                                <h2 className="heading1">Add New Lead</h2>
                            </div>

                            <div className="form-group">

                                <div className="row row-spacing">


                                    <div className="col-md-3">
                                        <input className="form-control" type="text" placeholder="First Name" value={this.state.firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control " type="text" placeholder="Last Name" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control " type="email" placeholder="Email Address" value={this.state.emailAddress} onChange={(e) => { this.setState({ emailAddress: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control " type="text" placeholder="Phone Number" value={this.state.phoneNumber} onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                    </div>


                                </div>

                                <div className="row row-spacing">

                                    <div className="col-md-3">
                                        <input className="form-control" type="text" placeholder="Company" value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                    </div>

                                    <div className="col-md-3">
                                        <select className="form-control" value={this.state.requestType} onChange={(e) => { (e.target.value == "Interest ...") ? this.setState({ requestType: '' }) : this.setState({ requestType: e.target.value }) }}>
                                            <option defaultValue>Interest ...</option>
                                            <option>General Information</option>
                                            <option>Loan Information</option>
                                            <option>Speak with an Agent</option>
                                            <option>Market Trends</option>
                                        </select>
                                    </div>


                                    <div className="col-md-3">
                                        <select className="form-control" value={this.state.referralType} onChange={(e) => { (e.target.value == "Referral Type ...") ? this.setState({ referralType: '' }) : this.setState({ referralType: e.target.value }) }}>
                                            <option defaultValue>Referral Type ...</option>
                                            <option>TV</option>
                                            <option>Radio</option>
                                            <option>Internet</option>
                                            <option>Walk-in</option>
                                            <option>Referral</option>
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        {(this.state.referralType == "Referral")
                                            ?

                                            <input className="form-control col-md-3" type="text" placeholder="Name of Referal" value={this.state.referralName} onChange={(e) => { this.setState({ referralName: e.target.value }) }} onKeyDown={this.onEnterPress} />

                                            :

                                            <input className="form-control" type="text" placeholder="Name of Referal" value={this.state.referralName} onChange={(e) => { this.setState({ referralName: e.target.value }) }} onKeyDown={this.onEnterPress} disabled />

                                        }

                                    </div>

                                </div>


                                <div className="row row-spacing">

                                    <div className="col-md-3">
                                        {/* <label htmlFor="" className="input1">Realor's Name</label> */}
                                        <select className="form-control" onChange={(e) => { (e.target.value == "Realtor's Name ...") ? this.setState({ realtorID: 1, realtorName: "I don't have one yet" }) : this.setState({ realtorID: e.target.value, realtorName: e.target.selectedOptions[0].text }) }} >
                                            <option defaultValue>Realtor's Name ...</option>
                                            <option value="2">Eddie Money</option>
                                            <option value="3">Mo House</option>
                                            <option value="4">Max Power</option>
                                            <option value="1">I don't have one yet</option>
                                        </select>
                                        </div>

                                        {/* <label htmlFor="" className="input1">Application Status</label> */}
                                        <div className="col-md-3">
                                        <select className="form-control" onChange={(e) => { (e.target.value == "Application Status ...") ? this.setState({ applicationStatus: "In Contact" }) : this.setState({ applicationStatus: e.target.value }) }}>
                                            <option defaultValue>Application Status ...</option>
                                            <option>Purchase only</option>
                                            <option>Looking</option>
                                            <option>Application for Pre-Qualified</option>
                                            <option>Application for Pre-Approval</option>
                                            <option>Looking - Pre-Qualified</option>
                                            <option>Looking - Pre-Approved</option>
                                            <option>In Contract</option>
                                        </select>
                                        </div>

                                        <div className="col-md-3">
                                        {/* <label htmlFor="" className="input1">Loan Status</label> */}
                                        <select className="form-control" onChange={(e) => { (e.target.value == "Loan Status ...") ? this.setState({ loanStatus: "Lead" }) :  this.setState({ loanStatus: e.target.value }) }}>
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
                                    <button className="btn col-md-2 " onClick={this.previousPg.bind(this)}>Cancel</button>
                                    <button type="submit" className="btn col-md-2 col-md-offset-10" onClick={this.userSignUp.bind(this)}>Submit</button>
                                </div>


                            {/* <div className="row" style={{ margin: 10, paddingBottom: 10 }} >
                            
                                <div className="col-md-8 col-md-offset-9">
                                    <button className="btn col-md-2 " >Cancel</button>
                                    <button type="submit" className="btn col-md-2 " style={{ marginLeft: 14 }} onClick={this.userSignUp.bind(this)}>Submit</button>
                                </div>
                            </div> */}




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
