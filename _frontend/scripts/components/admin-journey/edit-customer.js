import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import MD5 from 'crypto-js/md5';
import Dashboard from './dashboard'

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerObject: props.customerObject,
            redirectFlag: false,
            redirectDetails: false
        }
    }

    onSave(e) {
        var self = this
        let url = 'http://localhost:3000/customer/' + this.state.customerObject.ID + '?token=' + this.props.adminLoginToken;
        console.log(this.state.customerObject.Email)
        axios.put(url, this.state.customerObject)
            .then(function (response) {
                console.log(response)
            })
        var hashedEmail = CryptoJS.MD5(this.state.customerObject.Email).toString();
        var subscribeBody = {
            "email_address": this.state.customerObject.Email,
            "merge_fields": {
                "FNAME": this.state.customerObject.FirstName,
                "LNAME": this.state.customerObject.LastName,
                "PHONE": this.state.customerObject.Phone,
                "COMPANY": this.state.customerObject.Company,
                "REQUEST": this.state.customerObject.AreaOfInterest,
                "REFERRAL": this.state.customerObject.HeardAbout,
                "REFERREDBY": this.state.customerObject.Referral
            }
        }
        let urlString = 'http://localhost:3000/subscriptions/' + hashedEmail;
        axios.put(urlString, subscribeBody)
            .then(response => {
                this.setState({
                    redirectFlag: true
                })
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
    previousPg() {
        this.setState({
            redirectDetails: true
        })
    }

    render() {
        if (this.state.redirectFlag) {
            return (
                <Redirect to="/admin-dashboard" />
            )
        }

        if (this.state.redirectDetails) {
            return (
                <Redirect to="/admin-customer" />
            )
        }

        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-10 col-md-offset-1 editCustomerPage " >
                        <div style={{ margin: 15 }}>
                            <div className="row" >
                                <h2 style={{ margin: 20 }}>Edit Customer</h2>
                            </div>

                            <div className="form-group">

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <input className="form-control input2" type="text" placeholder="First Name" value={this.state.customerObject.FirstName} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, FirstName: e.target.value } }) }} />
                                        <input className="form-control input1" type="text" placeholder="Last Name" value={this.state.customerObject.LastName} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, LastName: e.target.value } }) }} />
                                        <input className="form-control input1" type="email" name="" id="customerEmail" placeholder="Email Address" value={this.state.customerObject.Email} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Email: e.target.value } }) }} />
                                        <input className="form-control input1" type="text" placeholder="Phone Number" value={this.state.customerObject.Phone} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Phone: e.target.value } }) }} />

                                    </div>
                                </div>

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <input className="form-control input2" type="text" placeholder="Company" value={this.state.customerObject.Company} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Company: e.target.value } }) }} />


                                        <div className="form-group">
                                            <label htmlFor="email" className="input1">Interest:</label>
                                            <select className="form-control" value={this.state.customerObject.AreaOfInterest} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, AreaOfInterest: e.target.value } }) }}>
                                                <option>General Information</option>
                                                <option>Loan Information</option>
                                                <option>Speak with an Agent</option>
                                                <option>Market Trends</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="" className="input1">Referral Type</label>
                                            <select className="form-control" value={this.state.customerObject.HeardAbout} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, HeardAbout: e.target.value } }) }}>
                                                <option defaultValue>Select ...</option>
                                                <option>TV</option>
                                                <option>Radio</option>
                                                <option>Internet</option>
                                                <option>Walk-in</option>
                                                <option>Rereral</option>
                                            </select>
                                            <label htmlFor="" className="input1">Name of Referral</label>
                                            <input className="form-control" type="text" placeholder="" value={this.state.customerObject.Referral} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Referral: e.target.value } }) }} />
                                        </div>

                                    </div>
                                </div>

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">

                                        <label htmlFor="" className="input1">Application Status</label>
                                        <select className="form-control" value={this.state.customerObject.ApplicationStatus} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, ApplicationStatus: e.target.value } }) }}>
                                            <option>Purchase only</option>
                                            <option>Looking</option>
                                            <option>Application for Pre-Qualified</option>
                                            <option>Application for Pre-Approval</option>
                                            <option>Looking - Pre-Qualified</option>
                                            <option>Looking - Pre-Approved</option>
                                            <option>In Contract</option>
                                        </select>



                                        <label htmlFor="" className="input1">Loan Status</label>
                                        <select className="form-control" value={this.state.customerObject.LoanStatus}>
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


                                <div className="row" style={{ margin: 10, paddingBottom: 10 }} >
                                {/* <div className="row" style={{ paddingBottom: 10 }} > */}
                                    <div className="col-md-8 col-md-offset-9">
                                        <button className="btn col-md-2 " onClick={this.previousPg.bind(this)}>Cancel</button>
                                        <button className="btn col-md-2 " style={{ marginLeft: 14 }} onClick={this.onSave.bind(this)}>Submit</button>
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
const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        customerObject: state.customerObject,
    }
}

export default connect(mapStateToProps)(EditCustomer);