import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/customer/id/' + this.props.customerObject.ID)
            .then(response => {
                this.setState({
                    customer: response.data[0]
                })
                console.log(this.state.customer)
            })
    }

    
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
                                <tr>
                                    <th className="input2">Date:</th>
                                    <td>01/01/2018</td>
                                    <th>Method of Contact:</th>
                                    <td>method type</td>
                                </tr>
                                <br />
                            </tbody>
                        </table>

                        {/* notes table-for customer information not avalible in form fields */}

                        <table>
                            <tbody className="col-md-11">
                                <tr>
                                    <th className="col-md-1">Notes:</th>
                                    <td className="col-md-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nostrum cupiditate dolore sint non perspiciatis lorem
                                    distinctio voluptatum ipsam officiis error veritatis id eligendi, nihil excepturi recusandae maxime dolores inventore nesciunt.
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui voluptatem doloremque enim sequi iusto nulla velit optio ullam consectetur
                                    asperiores aut similique ex, numquam reiciendis suscipit ipsum fuga ab cupiditate.</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Edit button-- toggle page to edit form */}

                        <div className="row" style={{ margin: 10 }}>
                            <button className="btn col-md-2 col-md-offset-9" onClick={this.handleEdit.bind(this)}>Edit</button>
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