import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            companyName: '',
            requestType: '',
            realtorName: '',
            referralType: '',
            referralName: '',
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
                        "DateLastContacted": "",
                        "Source": "Internet"
                    }
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
            return <Redirect to="/welcome" />
        }

        return (
            <div className="body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 admin-login">
                            <div className="row login-form">
                                <div className="col-md-4 col-md-offset-4 text-center">
                                    <h3>Sign Up</h3>
                                </div>
                                <div className="in-line10">
                                    <div className="col-md-10">
                                        <form>
                                            <div className="form-group">
                                                <div className="col-md-6">
                                                    <label htmlFor="firstName">First Name:</label>
                                                    <input type="text" autoComplete="given-name" className="form-control form-spacing" value={this.state.firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lastName">Last Name:</label>
                                                    <input type="text" autoComplete="family-name" className="form-control form-spacing" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="emailAddress">E-mail:</label>
                                                    <input type="email" autoComplete="email" className="form-control form-spacing" value={this.state.emailAddress} onChange={(e) => { this.setState({ emailAddress: e.target.value }) }} onKeyDown={this.onEnterPress} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                                    <input type="tel" autoComplete="tel" className="form-control form-spacing" value={this.state.phoneNumber} onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="companyName">Company Name:</label>
                                                    <input type="text" autoComplete="off" className="form-control " value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="requestType" >How can we help you?</label>
                                                    <select className="form-control" value={this.state.requestType} onChange={(e) => { this.setState({ requestType: e.target.value }) }} >
                                                        <option defaultValue>Select ...</option>
                                                        <option>General Information</option>
                                                        <option>Loan Information</option>
                                                        <option>Speak with an Agent</option>
                                                        <option>Market Trends</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="referralType" className="form-spacing3">Who is your real estate agent?</label>
                                                    <select className="form-control" value={this.state.realtorName} onChange={(e) => { this.setState({ realtorName: e.target.value }) }} >
                                                        <option defaultValue>Select ...</option>
                                                        <option>Max Power</option>
                                                        <option>Eddie Money</option>
                                                        <option>Mo House</option>
                                                        <option>I don't have one yet</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="referralType" className="form-spacing3">How did you here about us?</label>
                                                    <select className="form-control" value={this.state.referralType} onChange={(e) => { this.setState({ referralType: e.target.value }) }} >
                                                        <option defaultValue>Select ...</option>
                                                        <option>TV</option>
                                                        <option>Radio</option>
                                                        <option>Internet</option>
                                                        <option>Walk-in</option>
                                                        <option>Referral</option>
                                                    </select>
                                                </div>
                                                { (this.state.referralType == "Referral")
                                                    ?
                                                    <div className="col-md-6 col-md-offset-6">
                                                        <label htmlFor="referralName" className="form-spacing3">Name of Referral</label>
                                                        <input className="form-control" type="text" autoComplete="off" value={this.state.referralName} onChange={(e) => { this.setState({ referralName: e.target.value }) }} onKeyDown={this.onEnterPress} />
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                            </div>
                                        </form>
                                        <div className="row">
                                            <button type="submit" className="btn col-md-6 col-md-offset-3 form-spacing5" onClick={this.userSignUp.bind(this)}>Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;
