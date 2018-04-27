import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import CustomerDetails from './details-customer';
import 'react-table/react-table.css';
import axios from 'axios';
import { setViewCustDetails } from '../../redux/actions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCustomers: [],
            visits: false,
            redirectToDetails: false
        }
    }

    // componentWillReceiveProps() {
    //     console.log("props")
    // }

    // componentDidMount () {
    //     console.log("update")
    //     this.setState({
    //         visits: this.state.visits += 1
    //     })
    //     console.log(this.state.visits)
    // }


    // componentDidMount() {
    //     console.log(this.props.adminLoginToken)
    //     axios.get("http://localhost:3000/customer/active?token=" + this.props.adminLoginToken)
    //         .then(response => {
    //             this.setState({
    //                 activeCustomers: response.data,
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.setState({
    //         visits: true
    //     })
    // }

    componentDidMount() {
        console.log(this.props.adminLoginToken)
        axios.get("http://localhost:3000/customer/active?token=" + this.props.adminLoginToken)
            .then(response => {
                this.setState({
                    activeCustomers: response.data,
                })
            })
    }

    render() {
        const { redirectToDetails } = this.state;
        if (redirectToDetails) {
            return <Redirect to="/admin-customer" />
        }

        // function that creates the columns for the dashboard
        const columns = [
            {
                Header: "ID",
                accessor: 'ID',
                show: false,
                filterMethod: (filter, row) =>
                    (row[filter.id].toLowerCase()).startsWith(filter.value)
            },
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
            {
                Header: "Application Status",
                accessor: "ApplicationStatus",
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
            }
        ]

        return (
            <div className="body">

                    <div className="container dashboard-top">

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
                                                    <th className="input2">First Name: </th>
                                                    <td>{this.state.activeCustomers[row.index].FirstName}</td>
                                                    <th className="input1 ">Last Name:</th>
                                                    <td>{this.state.activeCustomers[row.index].LastName}</td>
                                                    <th className="input1 ">E-mail:</th>
                                                    <td>{this.state.activeCustomers[row.index].Email}</td>
                                                    <th className="input1 ">Phone Numer:</th>
                                                    <td>{this.state.activeCustomers[row.index].Phone}</td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <th className="input2">Company:</th>
                                                    <td className="input1">{this.state.activeCustomers[row.index].Company}</td>
                                                    <th className="input1 ">Interest:</th>
                                                    <td>{this.state.activeCustomers[row.index].AreaOfInterest}</td>
                                                    <th className="input1 ">Referral Type:</th>
                                                    <td>{this.state.activeCustomers[row.index].HeardAbout}</td>
                                                    <th className="input1">Name of Referral:</th>
                                                    <td>{this.state.activeCustomers[row.index].Referral}</td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <th className="input2">Application Status:</th>
                                                    <td>{this.state.activeCustomers[row.index].ApplicationStatus}</td>
                                                    <th className="input1 ">Loan Status:</th>
                                                    <td>{this.state.activeCustomers[row.index].LoanStatus}</td>
                                                </tr>
                                                <br />
                                            </tbody>
                                        </table>
                                        <div className="" style={{ marginBottom: 265 }}>
                                            <button className="btn col-md-2 input1 pull-right" style={{ paddingBottom: 10, marginRight:30 }} onClick={this.viewDetails.bind(this, row)}>View Customer Details</button>
                                          
                                        </div>
                                    </div>
                                )
                            }}
                        />
                    </div>
                </div>
        )
    }

    viewDetails(customer, e) {
        // Get the customer being clicked and store in redux
        // Send the customer's details to redux for the view details page
        this.props.sendCustomerToRedux(customer.original);

        this.setState({
            redirectToDetails: true
        });
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCustomerToRedux: customerObject => dispatch(setViewCustDetails(customerObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
