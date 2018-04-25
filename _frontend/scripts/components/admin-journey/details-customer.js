import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3000/customer/id/' + this.props.customerObject.ID)
    //         .then(response => {
    //             this.setState({
    //                 customer: response.data[0]
    //             })
    //             console.log(this.state.customer)
    //         })
    // }

    
    render() {
        return (

            <div className="container">
                <div className="col-md-11 ">
                    <div className="container addCustomerPage">

                        <table className="col-md-10 table1">
                            <tbody>

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
                                    <th className="input2">Company:</th>
                                    <td>{this.state.customer.Company}</td>
                                    <th className="input1">Intrest:</th>
                                    <td>{this.state.customer.AreaOfInterest}</td>
                                    <th className="input1">Referal Type:</th>
                                    <td>{this.state.customer.HeardAbout}</td>
                                    <th className="input1">Name of Referal:</th>
                                    <td>{this.state.customer.Referral}</td>
                                </tr>
                                <br />
                            </tbody>
                        </table>

                        {/* Edit button-- toggle page to edit form */}

                        <div className="row" style={{ margin: 10 }}>
                         <Link to="/notes">   <button className="btn col-md-2 " style={{ margin: 10 }}>New Note</button></Link>
                        
                         <Link to="/edit-customer">   <button className="btn col-md-2 " style={{ margin: 10 }}>Edit</button></Link>
                        </div>

                    </div>


                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        customerObject: state.customerObject,
    }
}

export default connect(mapStateToProps)(CustomerDetails);