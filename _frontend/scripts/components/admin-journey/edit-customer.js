import React, { Component } from 'react';
class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div className="container">
                <div className="col-md-12 addCustomerPage">
                    <div className="container">
                        <div className="row">
                            <h2 style={{ margin: 20 }}>Edit Customer</h2>
                        </div>

                        <div className="form-group">

                            <div className="row">
                                <div className="form-inline col-md-10">
                                    <input className="form-control input2" type="text" placeholder="First Name" />
                                    <input className="form-control input1" type="text" placeholder="Last Name" />
                                    <input className="form-control input1" type="email" name="" id="customerEmail" placeholder="Email Address" />
                                    <input className="form-control input1" type="text" placeholder="Phone Number" />

                                </div>
                            </div>

                            <div className="row">
                                <div className="form-inline col-md-11">
                                    <input className="form-control input2" type="text" placeholder="Company" />
                                    <input className="form-control input1" type="text" placeholder="Intrest" />
                                    <label htmlFor="" className="input1">Referal Type</label>
                                    <select className="form-control">
                                        <option>Email</option>
                                        <option>Phone</option>
                                        <option>Advertisement</option>
                                        <option>Walk-in</option>
                                        <option>Rereral </option>
                                    </select>
                                    <label htmlFor="" className="input1">Name of Referal</label>
                                    <input className="form-control" type="text" placeholder="" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-inline col-md-10">
                                    <label htmlFor="" className="input2">Date</label>
                                    <input className="form-control" type="date" id="datePicker" />
                                    <label htmlFor=""className="input1">Method of Contact</label>
                                    <select className="form-control">
                                        <option>Email</option>
                                        <option>Phone</option>
                                        <option>In Person</option>
                                    </select>
                                </div>
                            </div>

                            <label htmlFor="">Notes</label>
                            <div className="row">
                                <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5"></textarea>
                            </div>

                            <div className="row" style={{margin:10}}>
                                <button className="btn col-md-2 col-md-offset-9">Submit</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

         )
    }
}
 
export default EditCustomer;