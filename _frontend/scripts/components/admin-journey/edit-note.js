import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNoteDate: this.dateInputFormat(this.props.editNote.DateContacted),
            addNoteContactMethod: this.props.editNote.ContactMethod,
            addNoteMessage: this.props.editNote.ContactMessage,
            redirectToDetails: false
        }

        
    }


    render() {
        const { redirectToDetails } = this.state;
        if (redirectToDetails) {
            return <Redirect to="/admin-customer" />
        }

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
                                    <input className="form-control" type="datetime-local" id="datePicker" value={ this.state.addNoteDate } onChange={ (e) => { this.setState({ addNoteDate: e.target.value }) } } />
                                    <label htmlFor="" className="input1">Method of Contact</label>
                                    <select className="form-control" value={ this.state.addNoteContactMethod } onChange={ (e) => { this.setState({ addNoteContactMethod: e.target.value }) } } >
                                        <option defaultValue>Select ...</option>
                                        <option>Email</option>
                                        <option>Phone</option>
                                        <option>In Person</option>
                                    </select>
                                </div>
                            </div>

                            <label htmlFor="">Note</label>
                            <div className="row row-spacing">
                                <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5" maxLength="512" value={ this.state.addNoteMessage } onChange={ (e) => { this.setState({ addNoteMessage: e.target.value }) } } ></textarea>
                            </div>

                            <div className="row" style={{ margin: 10, paddingBottom: 10 }}>
                                <button className="btn col-md-2 col-md-offset-9" onClick={ this.updateNote.bind(this)}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

    updateNote(note, e) {
        // Update the note
        // Create the note object
        var contactActivity = {
            ID: this.props.editNote.ID,
            AdminID: this.props.editNote.ID,
            CustomerID: this.props.viewCustomer.ID,    //this.state.customer.ID,
            DateContacted: this.datePutFormat(this.state.addNoteDate),
            ContactMethod: this.state.addNoteContactMethod,
            ContactMessage: this.state.addNoteMessage
        }
        // console.log(contactActivity);
        
        // Make sure a date, contact method and message are entered
        if (this.state.addNoteDate == "") {
            alert("Please enter a date.");
        }
        else if (this.state.addNoteContactMethod == "Select ...") {
            alert("Please select a method of contact.");
        }
        else if (this.state.addNoteMessage == "") {
            alert("Please enter a message.");
        }
        else {
            // All fields filled in. Proceed with the insert
            axios.put("http://localhost:3000/contactactivity/" + this.props.editNote.ID  + "?token=" + this.props.adminLoginToken, contactActivity)
            .then(response => {
                // console.log(response);

                this.setState({
                    redirectToDetails: true
                })
            })

            // Clear the form
            this.setState({
                addNoteDate: this.dateInputFormat(),
                addNoteContactMethod: 'Select ...',
                addNoteMessage: ''
            });
        }

    }

    datePutFormat(putDate) {
        // Returns the date in "yyyy-MM-dd hh:mm:ss" format for use in the put route (to insert into sql server)
        putDate = putDate.replace("T", " ");
        return putDate + ":00";
    }

    dateInputFormat(inputDate) {
        // Returns the date in "yyyy-MM-ddThh:mm" format to populate the default current date value in the datetime textbox
        var now = new Date(inputDate);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + parseInt(now.getHours() + 7); if (hour.length == 1) { hour = "0" + hour; }  // Add 7 hours to convert to Pacific time
        if (hour == 24) {
            // Set time to 12
            hour = 12;
        }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
    }    
}

const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken,
        customerObject: state.customerObject,
        viewCustomer: state.viewCustomer,
        adminObject: state.adminObject,
        editNote: state.editNote
    }
}


export default connect(mapStateToProps)(EditNote);