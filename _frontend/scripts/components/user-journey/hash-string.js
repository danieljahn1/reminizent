import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import MD5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';

class HashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hashedMD5: '',
            hashedSHA256: ''
        }
    }

    hashEmail() {
        // var hash = CryptoJS.MD5(this.state.email);
        var hashMD5 = CryptoJS.MD5(this.state.email).toString();
        var hashSHA256 = CryptoJS.SHA256(this.state.email).toString();
        this.setState({
            hashedMD5: hashMD5,
            hashedSHA256: hashSHA256
        })
    }
    render() {
        return (
            <div className="form-group col-md-6">
                <label htmlFor="email">String to hash:</label>
                <input type="email" autoComplete="email" id="email" className="form-control form-spacing" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                <button type="submit" className="btn col-md-6 col-md-offset-3 form-spacing5" onClick={this.hashEmail.bind(this)}>Hash Email</button>
                <div>Hashed MD5: {this.state.hashedMD5}</div>
                <div>Hashed SHA256: {this.state.hashedSHA256}</div>
            </div>
        )
    }
}

export default HashPage;