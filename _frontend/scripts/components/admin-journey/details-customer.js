import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCustomerObject } from '../../redux/actions';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import MD5 from 'crypto-js/md5';
import NoteEntry from './note-entry';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            customer: '',
            notes: '',
            subjectLine: '',
            template: '',
            href: '',
            openEmailModal: false,
            openEmailClient: false,
            redirectToEdit: false,
            redirectToDashboard: false,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/activity/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken)
            .then(response => {
                this.setState({
                    activity: response.data[0],
                    customer: this.props.viewCustomer  // sending redux state to local, so it does not error upon the logout.
                })
            })
    }

    resetEmailState() {
        this.setState({
            subjectLine: '',
            template: '',
            href: ''
        })
        this.openEmailModal();
    }

    openEmailModal() {
        this.setState({
            openEmailModal: true
        })
    }

    createEmail() {
        var emailHref = this.state.customer.Email;
        var emailSubject = this.state.subjectLine;
        if (this.state.template === "Template 1: General Reply") {
            var emailTemplate = "How are you doing?";
        } else if (this.state.template === "Template 2: Status Update") {
            var emailTemplate = "Your application is in progress";
        } else {
            var emailTemplate = "Congratulations, you've been approved!";
        }
        this.setState({
            href: "mailto:" + emailHref + "?subject=" + emailSubject + "&body=" + emailTemplate
        })
        this.openEmailClient();
    }

    openEmailClient() {
        this.setState({
            openEmailClient: true,
        })
    }

    goToEditCustomer() {
        this.props.sendCustomerObjToRedux(this.state.customer);
        this.setState({
            redirectToEdit: true
        })
    }

    onDelete() {
        let url = 'http://localhost:3000/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken
        axios.delete(url)
            .then(function (response) {
                console.log(response)
            })
        var hashedEmail = CryptoJS.MD5(this.props.viewCustomer.Email).toString();
        let urlUnsubscribe = 'http://localhost:3000/subscriptions/unsubscribe/' + hashedEmail;
        axios.delete(urlUnsubscribe)
            .then(response => {
                console.log(response)
                this.setState({
                    redirectToDashboard: true
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    redirectToDashboard: true
                })
            })
    }

    render() {
        const { redirectToEdit } = this.state;
        if (redirectToEdit) {
            this.setState({
                redirectToEdit: false
            })
            return <Redirect to="/edit-customer" />
        }

        const { redirectToDashboard } = this.state;
        if (redirectToDashboard) {
            this.setState({
                redirectToDashboard: false
            })
            return <Redirect to="/admin-dashboard" />
        }

        const { openEmailModal } = this.state;
        if (openEmailModal) {
            this.setState({
                openEmailModal: false
            })
            window.location.assign("http://localhost:8080/admin-customer#openModal");
        }

        const { openEmailClient } = this.state;
        if (openEmailClient) {
            this.setState({
                openEmailClient: false
            })
            window.location.assign(this.state.href);
        }

        return (
            <div className="container-fluid">
                <div className="col-md-10  col-md-offset-1 customerDetailsPage in-line2 ">
                    <div className="cutomerContainer" >
                        <div className="row">
                            <h2 className="heading1">Lead Details</h2>
                        </div>
                        <table className="col-md-12 form-spacing4">
                            <tbody>
                                {/* update customer/axios delete/call will need token go to "admin-customer" page */}
                                {/* creating the using sends its to redux. this call on did mount needs to grab by id */}
                                <tr>
                                    <th className="input2">First Name:</th>
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
                                    <td>
                                        {this.state.activity.DateCreated != undefined &&
                                            (
                                                this.formatDate(this.state.activity.DateCreated)
                                            )
                                        }
                                    </td>
                                    <th className="input1">Sign Up Source:</th>
                                    <td>{this.state.activity.Source}</td>

                                    <th className="input2">Company:</th>
                                    <td>{this.state.customer.Company}</td>
                                    <th className="input1">Interest:</th>
                                    <td>{this.state.customer.AreaOfInterest}</td>
                                </tr>
                                <br />
                                <tr>
                                    <th className="input2">Referral Type:</th>
                                    <td>{this.state.customer.HeardAbout}</td>
                                    <th className="input1">Name of Referral:</th>
                                    <td>{this.state.customer.Referral}</td>
                                    <th className="input1">Application Status:</th>
                                    <td>{this.state.customer.ApplicationStatus}</td>
                                    <th className="input1">Loan Status:</th>
                                    <td>{this.state.customer.LoanStatus}</td>
                                </tr>
                                <br />
                            </tbody>
                        </table>
                        {/* Edit button-- toggle page to edit form */}
                        <div className="row in-line3">
                            <button className="btn btn-danger col-md-2 input1 input2 pull-right in-line1" onClick={this.onDelete.bind(this)}>Delete Lead</button>
                            <button className="btn col-md-2 input1 input2 pull-right" onClick={this.goToEditCustomer.bind(this)}>Edit Lead</button>
                            <button className="btn col-md-2 input1 input2 pull-right in-line1" onClick={this.resetEmailState.bind(this)}>Email Lead</button>
                            <div id="openModal" className="modalDialog">
                                <div>
                                    <a href="#close" title="Close" className="close">X</a>
                                    <h3>Email {this.state.customer.FirstName} {this.state.customer.LastName} </h3>
                                    <h1></h1>
                                    <form>
                                        <div className="form-group">
                                            {/* <label htmlFor="email-modal">Email</label> */}
                                            <select className="form-control" id="email-modal" value={this.state.customer.subjectLine} onChange={(e) => { this.setState({ subjectLine: e.target.value }) }} required >
                                                <option defaultValue>Subject Line ...</option>
                                                <option >Thank you for contacting us</option>
                                                <option >Here's an update on your application</option>
                                                <option >You've been approved!</option>
                                            </select>
                                        </div>
                                        <h1></h1>
                                        <div className="form-group">
                                            {/* <label htmlFor="email-modal">Email</label> */}
                                            <select className="form-control" id="email-modal" value={this.state.customer.template} onChange={(e) => { this.setState({ template: e.target.value }) }} required >
                                                <option defaultValue>Subject Body Template ...</option>
                                                <option >Template 1: General Reply</option>
                                                <option >Template 2: Status Update</option>
                                                <option >Template 3: Approval</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                        <a href="#close" className="col-md-2 btn pull-right" onClick={this.createEmail.bind(this, this.state)}>Next</a>
                                        <a href="#close" className="col-md-2 btn pull-right btn-danger" >Cancel</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* add note section */}
                        <NoteEntry />
                    </div>
                </div>
            </div>
        )
    }

    formatDate(d) {
        // Format the date from yyyy-mm-dd into MM/dd/yyyy for display
        var year = d.substr(0, 4);
        var month = d.substr(5, 2);
        var day = d.substr(8, 2);
        var time = ''; // d.substr(11,5);

        // Convert 24 hour time to 12 hour AM/PM
        var hour = d.substr(11, 2);
        if (hour > 12) {
            // PM. Subtract 12 from the hour
            hour -= 12;
            time = hour + ":" + d.substr(14, 2) + " PM";
        }
        else if (hour == "00") {
            // 12 AM
            time = 12 + ":" + d.substr(14, 2) + " AM";;
        }
        else if (hour == "12") {
            // 12 PM
            time = 12 + ":" + d.substr(14, 2) + " PM";
        }
        else {
            // AM
            time = d.substr(11, 5) + " AM";
            if (time.indexOf('0') == 0) {
                // remove the leading zero
                time = time.substr(1);
            }
        }
        var date = month + '/' + day + '/' + year + " " + time;
        return date;
    }
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        viewCustomer: state.customerObject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCustomerObjToRedux: customerObject => dispatch(setCustomerObject(customerObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
