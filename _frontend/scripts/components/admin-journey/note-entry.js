import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEditNote } from '../../redux/actions';

class NoteEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            addNoteDate: this.dateInputFormat(),
            addNoteContactMethod: 'Select ...',
            addNoteMessage: '',
            redirectToDetails: false
        }
    }

    componentDidMount() {
        this.getContactActivityNotes();
    }


    getContactActivityNotes() {
        axios.get('http://localhost:3000/contactactivity/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken)
            .then(response => {
                
                this.setState({                    
                    notes: response.data
                })
                
            })
            .catch(err => {
                this.setState({
                    notes: []
                })
            })
    }

    render() {
        const { redirectToDetails } = this.state;
        if (redirectToDetails) {
            return <Redirect to="/edit-note" />
        }

        return (
            <div className="form-spacing4">
                <div className="row">
                    {/* add note section */}
                            <h2 className="heading1">Add New Note</h2>
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

                        <label htmlFor="">Notes</label>
                        <div className="row row-spacing">
                            <textarea className=" addCustomerForm col-md-11" id="cutomerNote" cols="30" rows="5" value={ this.state.addNoteMessage } onChange={ (e) => { this.setState({ addNoteMessage: e.target.value }) } } ></textarea>
                        </div>

                        <div className="row in-line3">
                            <button className="btn col-md-2 input1 input2 pull-right" onClick={ this.submitNote.bind(this) }>Add Note</button>
                </div>


                {/* note history section */}
                <div className="row" >
                        <div className="col-md-12 table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th className="col-md-1">Date</th>
                                        <th className="col-md-2">Method of Contact</th>
                                        <th className="col-md-2">Created by</th>
                                        <th className="col-md-5">Note</th>
                                        <th className="col-md-2"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        // If there are no notes for the customer, display a message. Else display all notes.
                                        (this.state.notes.length == 0)
                                        ?
                                        <tr>
                                           <td colSpan="5">There are no notes.</td> 
                                        </tr>
                                        :
                                        // Display all notes
                                        this.state.notes.map( item =>
                                            <tr key={item.ID}>
                                                <td>
                                                    { item.DateContacted != undefined &&
                                                    (
                                                        this.formatDate(item.DateContacted)
                                                    )
                                                    }
                                                </td>
                                                <td>{ item.ContactMethod }</td>
                                                <td>{ item.Email }</td>
                                                <td>{ item.ContactMessage }</td>
                                                <td>
                                                    <button className="btn" style={{marginRight:14}} onClick={ this.editNote.bind(this, item) }>Edit</button>
                                                    <button className="btn btn-danger btn-delete" onClick={ this.deleteNote.bind(this, item) }>X</button>
                                                </td>
                                            </tr>
                                        )
                                    } 
                                    </tbody>  
                                

                            </table>
                        </div>

                </div>

            </div>


        )
    }

    submitNote(e) {
        // Add the contact note
        var contactActivity = {
            AdminID: this.props.adminObject.ID,
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
            axios.post('http://localhost:3000/contactactivity/?token=' + this.props.adminLoginToken, contactActivity)
            .then(response => {
                // console.log(response);

                // Update the notes list
                this.getContactActivityNotes();
            })

            // Clear the form
            this.setState({
                addNoteDate: this.dateInputFormat(),
                addNoteContactMethod: 'Select ...',
                addNoteMessage: ''
            });
        }        
    }

    deleteNote(note, e) {
        // Delete the note selected
        var confirmDel = confirm("Are you sure you want to delete this note?");

        if (confirmDel) {
            // Delete the note
            // console.log(note.ID + ". " + note.ContactMessage);
            axios.delete("http://localhost:3000/contactactivity/" + note.ID + "?token=" + this.props.adminLoginToken)
                .then(response => {
                    alert("The note has been deleted successfully.");

                    // Update the notes list
                    this.getContactActivityNotes();
                })
        }        
    }

    editNote(note, e) {
        // Send the note to edit  <Link to="/edit-note"> 
        var editNoteObj = {
            ID: note.ID,
            AdminID: note.AdminID,
            customerID: note.customerID,
            DateContacted: note.DateContacted,
            ContactMethod: note.ContactMethod,
            ContactMessage: note.ContactMessage
        }
        // console.log(editNoteObj);
        this.props.sendEditNoteToRedux(editNoteObj);

        this.setState({
            redirectToDetails: true
        });
    }

    datePutFormat(putDate) {
        // Returns the date in "yyyy-MM-dd hh:mm:ss" format for use in the put route (to insert into sql server)
        putDate = putDate.replace("T", " ");
        return putDate + ":00";
    }


    dateInputFormat() {
        // Returns the date in "yyyy-MM-ddThh:mm" format to populate the default current date value in the datetime textbox
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
    }    


    formatDate(d) {
        // Format the date from yyyy-mm-dd into MM/dd/yyyy for display
        var year = d.substr(0,4);
        var month = d.substr(5,2);
        var day = d.substr(8,2);
        var time = ''; // d.substr(11,5);
        
        // Convert 24 hour time to 12 hour AM/PM
        var hour = d.substr(11,2);
        if (hour > 12) {
            // PM. Subtract 12 from the hour
            hour -= 12;
            time = hour + ":" + d.substr(14,2) + " PM";
        }
        else if (hour == "00"){
            // 12 AM
            time = 12 + ":" + d.substr(14,2) + " AM";
        }
        else if (hour == "12") {
            // 12 PM
            time = 12 + ":" + d.substr(14,2) + " PM";
        }
        else {
            // AM
            time = d.substr(11,5) + " AM";
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
        viewCustomer: state.customerObject,
        adminObject: state.adminObject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendEditNoteToRedux: editNoteObject => dispatch(setEditNote(editNoteObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEntry);