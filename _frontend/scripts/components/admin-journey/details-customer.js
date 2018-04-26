import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NoteEntry from './note-entry';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/customer/id/' + this.props.customerObject.ID + '?token=' + this.props.adminLoginToken)
            .then(response => {
                this.setState({
                    customer: response.data[0]
                })
                console.log(this.state.customer)
                console.log(this.props.customerObject)
            })
    }


    render() {
        return (

            <div className="container-fluid">
                <div className="col-md-10  col-md-offset-1 ">
                    <div className="container-fluid customerDetailsPage"style={{paddingRight: 20}}>
                        <div className="container">
                            <div className="row">
                                <h2 style={{ margin: 20 }}>Customer Details</h2>
                            </div>

                            <table className="col-md-10 form-spacing4">
                                <tbody>
                                    {/* update customer/axios delete/call will need token go to "admin-customer" page */}
                                    {/* creating the using sends its to redux. this call on did mount needs to grab by id */}
                                    <tr>
                                        <th className="input2"> First Name: </th>
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
                                        <td></td>
                                        <th className="input1">Sign Up Sorce:</th>
                                        <td></td>

                                        <th className="input2">Company:</th>
                                        <td>{this.state.customer.Company}</td>
                                        <th className="input1">Intrest:</th>
                                        <td>{this.state.customer.AreaOfInterest}</td>

                                    </tr>
                                    <br />

                                    <tr>
                                        <th className="input2">Referal Type:</th>
                                        <td>{this.state.customer.HeardAbout}</td>
                                        <th className="input1">Name of Referal:</th>
                                        <td>{this.state.customer.Referral}</td>

                                        <th className="input1">Application Status:</th>
                                        <td></td>
                                        <th className="input1">Loan Status:</th>
                                        <td></td>
                                    </tr>
                                    <br />

                                </tbody>
                            </table>

                            {/* Edit button-- toggle page to edit form */}

                            <div className="row" style={{ margin: 10 }}>
                                <Link to="/edit-customer">   <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10, margin: 10 }}>Edit Customer</button></Link>
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
                                            <input className="form-control" type="date" id="datePicker" />
                                            <label htmlFor="" className="input1">Method of Contact</label>
                                            <select className="form-control">
                                                <option defaultValue>Select ...</option>
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

                                    <div className="row" style={{ margin: 10, paddingBottom: 10 }}>
                                        <Link to="/"> <button className="btn col-md-2 input1 input2 pull-right">Submit</button></Link>
                                    </div>
                                </div>
                            </div>


                            {/* note history section */}
                            <div className="row">
                                <div className="container">
                                    <div className="col-md-12 table-responsive ">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="col-md-1">Date</th>
                                                    <th className="col-md-2">Method of Contact</th>
                                                    <th className="col-md-3">Created by</th>
                                                    <th className="col-md-5">Note</th>
                                                    <th className="col-md-1"></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <NoteEntry />
                                            </tbody>
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
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        customerObject: state.customerObject,
    }
}

export default connect(mapStateToProps)(CustomerDetails);