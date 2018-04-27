import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NoteEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (

            <tr>
                <td>1/01/01</td>
                <td>Phone</td>
                <td>AdminUser@Email.com</td>
                <td>Lorem ipsum dolor, sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque hic accusantium exercitationem quaerat ab cupiditate quia, fuga error rem ducimus labore ipsam iusto asperiores! Explicabo est ipsam quaerat quidem?</td>
                <td>
                    <Link to="/edit-note"> <button className="btn">Edit</button></Link>
                </td>
            </tr>

        )
    }
}

export default NoteEntry;