import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCustomerObject } from '../../redux/actions';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import MD5 from 'crypto-js/md5';

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerObject: props.customerObject,
            emailToHash: props.customerObject.Email,
            redirectDetails: false
        }
    }

    componentDidMount() {
        console.log(this.props.customerObject);
        console.log(this.state.customerObject);
    }

    onSave(e) {
        var self = this
        let url = 'http://localhost:3000/customer/' + this.state.customerObject.ID + '?token=' + this.props.adminLoginToken;
        axios.put(url, this.state.customerObject)
            .then(function (response) {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        this.props.sendCustomerObjToRedux(this.state.customerObject);
        var hashedEmail = CryptoJS.MD5(this.state.emailToHash).toString();
        var subscribeBody = {
            "email_address": this.state.customerObject.Email,
            "merge_fields": {
                "FNAME": this.state.customerObject.FirstName,
                "LNAME": this.state.customerObject.LastName,
                "PHONE": this.state.customerObject.Phone,
                "COMPANY": this.state.customerObject.Company,
                "REQUEST": this.state.customerObject.AreaOfInterest,
                "REFERRAL": this.state.customerObject.HeardAbout,
                "REFERREDBY": this.state.customerObject.Referral,
                "REALTOR": this.state.customerObject.RealtorName,
                "APPSTATUS": this.state.customerObject.ApplicationStatus,
                "LOANSTATUS": this.state.customerObject.LoanStatus
            }
        }
        let urlString = 'http://localhost:3000/subscriptions/' + hashedEmail;
        axios.put(urlString, subscribeBody)
            .then(response => {
                this.setState({
                    redirectDetails: true
                })
                console.log(response)
            })
            .catch(err => {
                this.setState({
                    redirectDetails: true
                })
                console.log(err)
            })
    }

    previousPg() {
        this.setState({
            redirectDetails: true
        })
    }

    render() {
        if (this.state.redirectDetails) {
            this.setState({
                redirectDetails: false
            })
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
                                <h2 style={{ margin: 20 }}>Edit Lead</h2>
                            </div>

                            <div className="form-group">

                                <div className="row row-spacing">

                                    <div className="col-md-3">
                                        <label htmlFor="" className="">First Name: </label>
                                        <input className="form-control input2" type="text" placeholder="First Name" value={this.state.customerObject.FirstName} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, FirstName: e.target.value } }) }} />
                                    </div>

                                    <div className="col-md-3" >
                                        <label htmlFor="">Last Name: </label>
                                        <input className="form-control " type="text" placeholder="Last Name" value={this.state.customerObject.LastName} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, LastName: e.target.value } }) }} />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="">E-mail Address: </label>
                                        <input className="form-control" type="email" name="" id="customerEmail" placeholder="Email Address" value={this.state.customerObject.Email} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Email: e.target.value } }) }} />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="">Phone Number: </label>
                                        <input className="form-control" type="text" placeholder="Phone Number" value={this.state.customerObject.Phone} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Phone: e.target.value } }) }} />
                                    </div>


                                </div>


                                <div className="row row-spacing">

                                    <div className="col-md-3">
                                        <label htmlFor="">Company: </label>
                                        <input className="form-control " type="text" placeholder="Company" value={this.state.customerObject.Company} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Company: e.target.value } }) }} />
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="email" className="">Interest:</label>
                                            <select className="form-control" value={this.state.customerObject.AreaOfInterest} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, AreaOfInterest: e.target.value } }) }}>
                                                <option defaultValue></option>
                                                <option>General Information</option>
                                                <option>Loan Information</option>
                                                <option>Speak with an Agent</option>
                                                <option>Market Trends</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="">Referral Type:</label>
                                            <select className="form-control" value={this.state.customerObject.HeardAbout} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, HeardAbout: e.target.value } }) }}>
                                                <option defaultValue></option>
                                                <option>TV</option>
                                                <option>Radio</option>
                                                <option>Internet</option>
                                                <option>Walk-in</option>
                                                <option>Referral</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="" className="">Name of Referral:</label>
                                        <input className="form-control" type="text" placeholder="" value={this.state.customerObject.Referral} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, Referral: e.target.value } }) }} />
                                    </div>

                                </div>
                            </div>

                            <div className="row row-spacing">

                                <div className="col-md-3">
                                    <label htmlFor="referralType">Real Estate Agent:</label>
                                    <select className="form-control" value={this.state.customerObject.RealtorName} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, RealtorName: e.target.value, RealtorID: e.target.selectedOptions[0].id } }) }} >
                                        <option id="2">Eddie Money</option>
                                        <option id="3">Mo House</option>
                                        <option id="4">Max Power</option>
                                        <option id="1">I don't have one yet</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="" className="">Application Status:</label>
                                    <select className="form-control" value={this.state.customerObject.ApplicationStatus} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, ApplicationStatus: e.target.value } }) }}>
                                        <option>Purchase only</option>
                                        <option>Looking</option>
                                        <option>Application for Pre-Qualified</option>
                                        <option>Application for Pre-Approval</option>
                                        <option>Looking - Pre-Qualified</option>
                                        <option>Looking - Pre-Approved</option>
                                        <option>In Contact</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="" className="">Loan Status:</label>
                                    <select className="form-control" value={this.state.customerObject.LoanStatus} onChange={(e) => { this.setState({ customerObject: { ...this.state.customerObject, LoanStatus: e.target.value } }) }}>
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

                                <div className="col-md-3">
                                </div>

                            </div>


                            <div className="row" style={{ margin: 10, paddingBottom: 10 }} >
                                <div className="col-md-4 col-md-offset-8">
                                    <button className="btn col-md-2 pull-right" style={{ marginLeft: 14 }} onClick={this.onSave.bind(this)}>Submit</button>
                                    <button className="btn btn2 col-md-2 pull-right"  onClick={this.previousPg.bind(this)}>Cancel</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            // </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        customerObject: state.customerObject,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCustomerObjToRedux: customerObject => dispatch(setCustomerObject(customerObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
