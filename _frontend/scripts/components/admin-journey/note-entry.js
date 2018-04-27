import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class NoteEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            customer: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/contactactivity/customer/' + this.props.viewCustomer.ID + '?token=' + this.props.adminLoginToken)
            .then(response => {
                
                this.setState({                    
                    notes: response.data,
                    customer: this.props.viewCustomer  // sending redux state to local, so it does not error upon the logout.
                })
                
            })
            .catch(err => {
                console.log("No records");
            })
    }

    render() {
        return (
            <tbody>
            {
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
                            <Link to="/edit-note"> <button className="btn">Edit</button></Link>
                            <button className="btn btn-danger btn-delete">X</button>
                        </td>
                    </tr>
                )
            } 
            </tbody>                      
 

        )
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
            time = 12 + ":" + d.substr(14,2) + " AM";;
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
        customerObject: state.customerObject,
        viewCustomer: state.viewCustomer
    }
}

export default connect(mapStateToProps)(NoteEntry);