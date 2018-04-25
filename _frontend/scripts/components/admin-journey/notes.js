import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="body">
                <div className="container">
                    <div className="col-md-12 editCustomerPage">
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

                            <div className="row" style={{ margin: 10, paddingBottom:10 }}>
                                <Link to="/"> <button className="btn col-md-2 col-md-offset-9">Submit</button></Link>
                            </div>



                            {/* <tr>
                                    <th className="input2">Date:</th>
                                    <td>01/01/2018</td>
                                    <th>Method of Contact:</th>
                                    <td>method type</td>
                                </tr>
                                <br />
                            </tbody>
                        </table>

                        notes table-for customer information not avalible in form fields

                        <table>
                            <tbody className="col-md-11">
                                <tr>
                                    <th className="col-md-1">Notes:</th>
                                    <td className="col-md-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nostrum cupiditate dolore sint non perspiciatis lorem
                                    distinctio voluptatum ipsam officiis error veritatis id eligendi, nihil excepturi recusandae maxime dolores inventore nesciunt.
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui voluptatem doloremque enim sequi iusto nulla velit optio ullam consectetur
                                    asperiores aut similique ex, numquam reiciendis suscipit ipsum fuga ab cupiditate.</td>
                                </tr>
 */}

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Notes;