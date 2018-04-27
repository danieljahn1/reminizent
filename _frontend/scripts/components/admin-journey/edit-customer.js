import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './dashboard'
class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerObject: this.props.customerObject
        }
    }
    render() {
        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-10 col-md-offset-1 editCustomerPage">
                        <div className="container ">
                            <div className="row">
                                <h2 style={{ margin: 20 }}>Edit Customer</h2>
                            </div>

                            <div className="form-group">

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-10">
                                        <input className="form-control input2" type="text" placeholder="First Name" value={this.state.customerObject.FirstName} onChange={(e) => { this.setState({ customerObject: { ...customerObject, FirstName: e.target.value } }) }} />
                                        <input className="form-control input1" type="text" placeholder="Last Name" value={this.state.customerObject.LastName} onChange={(e) => { this.setState({ customerObject: { ...customerObject, LastName: e.target.value } }) }} />
                                        <input className="form-control input1" type="email" name="" id="customerEmail" placeholder="Email Address" value={this.state.customerObject.Email} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Email: e.target.value } }) }} />
                                        <input className="form-control input1" type="text" placeholder="Phone Number" value={this.state.customerObject.Phone} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Phone: e.target.value } }) }} />

                                    </div>
                                </div>

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <input className="form-control input2" type="text" placeholder="Company" value={this.state.customerObject.Company} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Company: e.target.value } }) }} />

                                        <div class="form-group">
                                            <label htmlFor="email" className="input1">Intrest:</label>
                                            <select className="form-control">
                                                <option defaultValue>Select ...</option>
                                                <option>General Information</option>
                                                <option>Loan Information</option>
                                                <option>Speak with an Agent</option>
                                                <option>Market Trends</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label htmlFor="" className="input1">Referal Type</label>
                                            <select className="form-control" value={this.state.customerObject.HeardAbout} onChange={(e) => { this.setState({ customerObject: { ...customerObject, HeardAbout: e.target.value } }) }}>
                                                <option defaultValue>Select ...</option>
                                                <option>TV</option>
                                                <option>Radio</option>
                                                <option>Internet</option>
                                                <option>Walk-in</option>
                                                <option>Rereral</option>
                                            </select>
                                            <label htmlFor="" className="input1">Name of Referal</label>
                                            <input className="form-control" type="text" placeholder="" value={this.state.customerObject.Referral} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Referral: e.target.value } }) }} />
                                        </div>

                                    </div>
                                </div>

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">

                                        <label htmlFor="" className="input1">Application Status</label>
                                        <select className="form-control">
                                            <option defaultValue>Select ...</option>
                                            <option>Purchase only</option>
                                            <option>Looking</option>
                                            <option>Application for Pre-Qualified</option>
                                            <option>Application for Pre-Approval</option>
                                            <option>Looking - Pre-Qualified</option>
                                            <option>Looking - Pre-Approved</option>
                                            <option>In Contract</option>
                                        </select>



                                        <label htmlFor="" className="input1">Loan Status</label>
                                        <select className="form-control">
                                            <option defaultValue>Select ...</option>
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


                                <div className="row" style={{ paddingBottom: 10 }} >
                                    <Link to="/admin-dashboard"> <button className="btn col-md-2 col-md-offset-9">Submit</button></Link>
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