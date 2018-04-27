import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import MD5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
// import SHA1 from 'crypto-js/SHA1';
// import SHA2 from 'crypto-js/SHA2';
// import SHA3 from 'crypto-js/SHA3';

class HashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hashedMD5: '',
            hashedSHA256: '',
            hashedSHA512: '',
            // hashedSHA1: '',
            // hashedSHA2: '',
            // hashedSHA3: '',
        }
    }

    hashEmail() {
        var hashMD5 = CryptoJS.MD5(this.state.email).toString();
        var hashSHA256 = CryptoJS.SHA256(this.state.email).toString();
        var hashSHA512 = CryptoJS.SHA512(this.state.email).toString();
        // var hashSHA1 = CryptoJS.SHA1(this.state.email).toString();
        // var hashSHA2 = CryptoJS.SHA2(this.state.email).toString();
        // var hashSHA3 = CryptoJS.SHA3(this.state.email).toString();
        this.setState({
            hashedMD5: hashMD5,
            hashedSHA256: hashSHA256,
            hashedSHA512: hashSHA512,
            // hashedSHA1: hashSHA1,
            // hashedSHA2: hashSHA256,
            // hashedSHA3: hashSHA3,
        })
    }
    render() {
        return (
            <div className="form-group col-md-10">
                <label htmlFor="email">String to hash:</label>
                <input type="email" autoComplete="email" id="email" className="form-control" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                <h1></h1>
                <button type="submit" className="btn" onClick={this.hashEmail.bind(this)}>Hash String</button>
                <h1></h1>
                <div>Hashed MD5: {this.state.hashedMD5}</div>
                <div>Hashed SHA256: {this.state.hashedSHA256}</div>
                <div>Hashed SHA512: {this.state.hashedSHA512}</div>
                {/* <div>Hashed SHA-1: {this.state.hashedSHA1}</div>
                <div>Hashed SHA-2: {this.state.hashedSHA2}</div>
                <div>Hashed SHA-3: {this.state.hashedSHA3}</div> */}
            </div>
        )
    }
}

export default HashPage;