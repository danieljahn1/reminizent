import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import CustomerDetails from './details-customer';
import 'react-table/react-table.css';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCustomers: []
        }

    }

    componentDidMount() {
        console.log(this.props.adminLoginToken)
        axios.get("http://localhost:3000/customer/active?token=" + this.props.adminLoginToken)
            .then(response => {

                this.setState({
                    activeCustomers: response.data
                })
            })

    }

    render() {

        // function that creates the columns for the dashboard
        const columns = [
            {
                Header: "First Name",
                accessor: 'FirstName',
                filterMethod: (filter, row) =>
                    (row[filter.id].toLowerCase()).startsWith(filter.value)
            },
            {
                Header: "Last Name",
                accessor: 'LastName',
                filterMethod: (filter, row) =>
                    (row[filter.id].toLowerCase()).startsWith(filter.value)
            },
            {
                Header: "Email",
                accessor: "Email",
                filterMethod: (filter, row) =>
                    (row[filter.id].toLowerCase()).startsWith(filter.value)
            },
            {
                Header: "Phone Number",
                accessor: "Phone",
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
            },
            // {
            //     Header: "Application Status",
            //     accessor: "ApplicationStatus",
            //     filterMethod: (filter, row) =>
            //         row[filter.id].startsWith(filter.value)
            // },
            {
                Header: "Loan Status",
                accessor: "Status",
                filterMethod: (filter, row) =>
                    (row[filter.id].toLowerCase()).startsWith(filter.value)
            }
        ]


        return (
            <div className="body">
                <div className="container">
                    <div className="row">

                        <div className="dashboard-top">
                            <Link to="/admin-subscribe"><button className="btn pull-right">Add Customer</button></Link>
                        </div>
                    </div>

                    <div className="container">

                        {/* table for the display of customers in data base and SubComponent that displays further deatils of customer and customer interaction */}

                        <ReactTable
                            data={this.state.activeCustomers}
                            filterable
                            defaultFilterMethod={(filter, row) =>
                                String(row[filter.id]) === filter.value}
                            className="dashboard -highlight dashboard-table"
                            columns={columns}
                            defaultPageSize={25}
                            SubComponent={row => {
                                return (
                                    <div className="">
                                        <table className="col-md-10 col-md-offset-1" style={{ marginLeft: 25, margin: 20 }}>
                                            <tbody>

                                               
                                                    <tr>
                                                        <th className="input2"> First Name: </th>
                                                        {/* <td>{this.state.activeCustomers.FirstName}</td> */}
                                                        <th className="input1">Last Name:</th>
                                                        {/* <td>{this.state.customer.LastName}</td> */}
                                                        <th className="input1">E-mail:</th>
                                                        {/* <td>{this.state.customer.Email}</td> */}
                                                        <th className="input1">Phone Numer:</th>
                                                        {/* <td>{this.state.customer.Phone}</td> */}
                                                    </tr>
                                            <br/>

                                               
                                                    <tr>
                                                        <th className="input2">Company:</th>
                                                        {/* <td>{this.state.customer.Company}</td> */}
                                                        <th className="input1">Intrest:</th>
                                                        {/* <td>{this.state.customer.AreaOfInterest}</td> */}
                                                        <th className="input1">Referal Type:</th>
                                                        {/* <td>{this.state.customer.HeardAbout}</td> */}
                                                        <th className="input1">Name of Referal:</th>
                                                        {/* <td>{this.state.customer.Referral}</td> */}
                                                    </tr>
                                                    <br />

                                                    <tr>
                                                        <th className="input2">Application Status:</th>
                                                        <th className="input1">Loan Status:</th>
                                                    </tr>
                                                    <br />

                                            </tbody>
                                        </table>
                                            <Link to="/admin-customer"> <button className="btn col-md-2 input1 pull-right" style={{ paddingBottom: 10 }}>View Customer Details</button></Link>
                                            <button className="btn col-md-2 input1 input2 pull-right" style={{ paddingBottom: 10 }}>Email Customer</button>

                                    </div>
                                        )
                                    }}
        
                                />
        
        
        
                    </div>
                </div>
            </div>
                    )
            
                    // function for dummy data
            
        function fakeData() {
            return [
                {
                        firstName: "John",
                    lastName: "Doe",
                    email: "email@email.com",
                    phoneNumber: "354-156-5215",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Jane",
                    lastName: "Doe",
                    email: "email@email.com",
                    phoneNumber: "687-352-9851",
                    date: "01/01/2018",
                    activity: "phone"
                },
                {
                        firstName: "Apple",
                    lastName: "Smith",
                    email: "email@email.com",
                    phoneNumber: "352-485-3542",
                    date: "01/01/2018",
                    activity: "N/A"
                },
                {
                        firstName: "Mary",
                    lastName: "Richardson",
                    email: "email@email.com",
                    phoneNumber: "254-895-3542",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Dick",
                    lastName: "Richardson",
                    email: "email@email.com",
                    phoneNumber: "894-635-3548",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Bob",
                    lastName: "Bobson",
                    email: "email@email.com",
                    phoneNumber: "348-975-2541",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Ella ",
                    lastName: "Falvey",
                    email: "email@email.com",
                    phoneNumber: "645-325-8554",
                    date: "01/02/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Vinni ",
                    lastName: "Bonham",
                    email: "email@email.com",
                    phoneNumber: "444-665-1123",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Bendix ",
                    lastName: "Miele",
                    email: "email@email.com",
                    phoneNumber: "258-354-2567",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Robin",
                    lastName: "Bobingson",
                    email: "email@email.com",
                    phoneNumber: "555-555-5555",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Jacklyn ",
                    lastName: "Ellison",
                    email: "email@email.com",
                    phoneNumber: "323-333-4444",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Jerad ",
                    lastName: "Lobdell",
                    email: "email@email.com",
                    phoneNumber: "892-652-9638",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Noemi ",
                    lastName: "Matthews",
                    email: "email@email.com",
                    phoneNumber: "354-854-3442",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Aurilia",
                    lastName: "Hoffman",
                    email: "email@email.com",
                    phoneNumber: "261-354-9851",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Pavel ",
                    lastName: "Dunlap",
                    email: "email@email.com",
                    phoneNumber: "354-654-3548",
                    date: "01/01/2018",
                    activity: "email marketing"
                },
                {
                        firstName: "Jerad ",
                    lastName: "Grolnic",
                    email: "email@email.com",
                    phoneNumber: "432-543-3246",
                    date: "01/01/2018",
                    activity: "N/A"
                },
                {
                        firstName: "Shannon ",
                    lastName: "Spiring",
                    email: "email@email.com",
                    phoneNumber: "555-555-5555",
                    date: "01/01/2018",
                    activity: "phone"
                },
            ];
        }

    }
}

const mapStateToProps = state => {
    return {
                        adminLoginToken: state.adminLoginToken,
                }
            }
            
export default connect(mapStateToProps)(Dashboard);