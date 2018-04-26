import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Dashboard from './dashboard'
class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerObject: this.props.customerObject
        }
    }

onSave (e) {
    
}  

    render() {
        return (
            <div className="body">
                <div className="container">
                    <div className="col-md-12 editCustomerPage">
                        <div className="container">
                            <div className="row">
                                <h2 style={{ margin: 20 }}>Edit Customer</h2>
                            </div>

                            <div className="form-group">

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-10">
                                        <input className="form-control input2" type="text" placeholder="First Name" value={this.state.customerObject.FirstName} onChange={(e) => { this.setState({ customerObject: { ...customerObject, FirstName: e.target.value } }) }}  />
                                        <input className="form-control input1" type="text" placeholder="Last Name" value={this.state.customerObject.LastName} onChange={(e) => { this.setState({ customerObject: { ...customerObject, LastName: e.target.value } }) }} />
                                        <input className="form-control input1" type="email" name="" id="customerEmail" placeholder="Email Address" value={this.state.customerObject.Email} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Email: e.target.value } }) }} />
                                        <input className="form-control input1" type="text" placeholder="Phone Number" value={this.state.customerObject.Phone} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Phone: e.target.value } }) }} />
                                        
                                    </div>
                                </div>

                                <div className="row row-spacing">
                                    <div className="form-inline col-md-11">
                                        <input className="form-control input2" type="text" placeholder="Company" value={this.state.customerObject.Company} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Company: e.target.value } }) }}/>

                                        <label htmlFor="email" className="input1">Intrest:</label>
                                        <select className="form-control">
                                            <option>General Information</option>
                                            <option>Loan Information</option>
                                            <option>Speak with an Agent</option>
                                            <option>Market Trends</option>
                                        </select>

                                        <label htmlFor="" className="input1">Referal Type</label>
                                        <select className="form-control" value={this.state.customerObject.HeardAbout} onChange={(e) => { this.setState({ customerObject: { ...customerObject, HeardAbout: e.target.value } }) }}>
                                            <option>Email</option>
                                            <option>Phone</option>
                                            <option>Advertisement</option>
                                            <option>Walk-in</option>
                                            <option>Rereral </option>
                                        </select>
                                        <label htmlFor="" className="input1">Name of Referal</label>
                                        <input className="form-control" type="text" placeholder="" value={this.state.customerObject.Referral} onChange={(e) => { this.setState({ customerObject: { ...customerObject, Referral: e.target.value } }) }} />
                                    </div>
                                </div>

                                <div className="row row-spacing" >
                                    <div className="form-inline col-md-10">
                                        <label htmlFor="" className="input2">Date</label>
                                        <input className="form-control" type="date" id="datePicker" />
                                        <label htmlFor="" className="input1">Method of Contact</label>
                                        <select className="form-control">
                                            <option>Email</option>
                                            <option>Phone</option>
                                            <option>In Person</option>
                                        </select>
                                    </div>
                                </div>

                                <label htmlFor="">Notes</label>
                                <div className="row row-spacing">
                                    <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5"></textarea>
                                </div>

                                <div className="row" style={{paddingBottom: 10}} >
                                   <Link to="/"> <button className="btn col-md-2 col-md-offset-9">Submit</button></Link>
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