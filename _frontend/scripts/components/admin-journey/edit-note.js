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
                        <div className="container">
                            <div className="row">
                                <h2 style={{ margin: 20 }}>Edit Note</h2>
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

                            <div className="row" style={{ margin: 10, paddingBottom: 10 }}>
                                <Link to="/"> <button className="btn col-md-2 col-md-offset-9">Submit</button></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default EditNote;