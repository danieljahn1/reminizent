import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-10 col-md-offset-1 editCustomerPage">
                        <div className="in-line3">
                            <div className="row">
                                <h2 className="heading1">Edit Note</h2>
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

                            <label htmlFor="">Note</label>
                            <div className="row row-spacing">
                                <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5" maxLength="512"></textarea>
                            </div>

                            <div className="row in-line3">
                                <div className="col-md-8 col-md-offset-9">
                                    <button className="btn col-md-2 input2">Cancel</button>
                                    <Link to="/"> <button className="btn col-md-2 in-line4">Submit</button></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default EditNote;