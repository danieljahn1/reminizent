import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import EditCustomer from './edit-customer';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }


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
                                    <td>first name</td>
                                    <th className="input1">Last Name:</th>
                                    <td>last name</td>
                                    <th className="input1">E-mail:</th>
                                    <td>email@email.com</td>
                                    <th className="input1">Phone Numer:</th>
                                    <td>777-777-7777</td>
                                </tr>
                                <br />
                                <tr>
                                    <th className="input2">Company:</th>
                                    <td>Company Name</td>
                                    <th className="input1">Intrest:</th>
                                    <td>intrest name</td>
                                    <th className="input1">Referal Type:</th>
                                    <td>Referal</td>
                                    <th className="input1">Name of Referal:</th>
                                    <td>Name of person</td>
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
                        <Link to="/edit-customer"><button className="btn col-md-2 col-md-offset-9"> Edit</button></Link>
                        </div>

                    </div>


                </div>
            </div>

        )
    }
}

export default CustomerDetails;