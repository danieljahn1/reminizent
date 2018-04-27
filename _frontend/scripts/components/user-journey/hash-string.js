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
            <div className="form-group">
                <label htmlFor="email">String to hash:</label>
                <input type="email" autoComplete="email" id="email" className="form-control" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                <button type="submit" className="btn" onClick={this.hashEmail.bind(this)}>Hash Email</button>
                <div>Hashed MD5: {this.state.hashedMD5}</div>
                <div>Hashed SHA256: {this.state.hashedSHA256}</div>
            </div>
        )
    }
}

export default HashPage;