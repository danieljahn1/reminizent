import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LearnMore extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body">
                <div className="container-fluid">
                    <img src="./images/landing-img.png" className="landing-img" alt="buildings" />
                    <div className="landing-text">
                        <h1 className="large-header">About Us</h1>
                        <p>Amet purus gravida quis blandit turpis cursus in hac habitasse. Felis eget velit aliquet sagittis id consectetur purus. Massa id neque aliquam vestibulum morbi blandit cursus risus. Habitant morbi tristique senectus et netus et malesuada. In nisl nisi scelerisque eu ultrices vitae auctor eu. Dictum varius duis at consectetur lorem. Mi sit amet mauris commodo quis imperdiet. Suspendisse faucibus interdum posuere lorem ipsum.</p>
                        <Link to="/"><button className="btn input1">Return Home</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LearnMore;
