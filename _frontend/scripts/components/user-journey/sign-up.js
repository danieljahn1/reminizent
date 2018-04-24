import React, { Component } from 'react'
import axios from 'axios'


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
            referralType: '',
            referralName: '',
            redirect: false
        }
    }

    userSignUp(e) {
        e.preventDefault();
        if (this.state.emailAddress != '') {
            var body = {
                "FirstName": this.state.firstName,
                "LastName": this.state.lastName,
                "Company": this.state.companyName,
                "Email": this.state.emailAddress,
                "Phone": this.state.phoneNumber,
                "AreaOfInterest": this.state.requestType,
                "HeardAbout": this.state.referralType,
                "Referral": this.state.referralName
            }
            axios.post('http://localhost:3000/customer', body)
                .then(response => {
                    console.log(response.data[0])
                    var body = {
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
                    axios.post('http://localhost:3000/subscriptions', body)
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
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 admin-login">
                        <div className="row login-form">
                            <div className="col-md-4 col-md-offset-4 text-center">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="col-md-4 col-md-offset-1">
                                <form className="form-inline" >
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name:</label>
                                        <input type="text" className="form-control input1" value={this.state.firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                                        <label htmlFor="emailAddress">Email:</label>
                                        <input type="email" className="form-control input1" value={this.state.emailAddress} onChange={(e) => { this.setState({ emailAddress: e.target.value }) }} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="companyName">Comany Name:</label>
                                        <input type="text" className="form-control input1" value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                                        <label htmlFor="referralType" className="input1">How did you hear about us?</label>
                                        <br />
                                        <select className="form-control" value={this.state.referralType} onChange={(e) => { this.setState({ referralType: e.target.value }) }} >
                                            <option defaultValue>Select ...</option>
                                            <option>TV</option>
                                            <option>Radio</option>
                                            <option>Internet</option>
                                            <option>Walk-in</option>
                                            <option>Rererral</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-4 col-md-offset-1">
                                <form className="form-inline" >
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name:</label>
                                        <input type="text" className="form-control input1" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                                        <label htmlFor="phoneNumber">Phone Number:</label>
                                        <input type="phone" className="form-control input1" value={this.state.phoneNumber} onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="requestType">How can we help you?:</label>
                                        <br />
                                        <select className="form-control" value={this.state.requestType} onChange={(e) => { this.setState({ requestType: e.target.value }) }} >
                                            <option defaultValue>Select ...</option>
                                            <option>General Information</option>
                                            <option>Loan Information</option>
                                            <option>Speak with an Agent</option>
                                            <option>Market Trends</option>
                                        </select>
                                        <label htmlFor="referralName" className="input1">Name of Referal</label>
                                        <input className="form-control" type="text" value={this.state.referralName} onChange={(e) => { this.setState({ referralName: e.target.value }) }} />
                                    </div>
                                </form>
                            </div>
                            <div className="row">
                                <button type="submit" className="btn col-md-6 col-md-offset-3" onClick={this.userSignUp.bind(this)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;