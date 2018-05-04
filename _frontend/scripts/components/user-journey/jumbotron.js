import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Jumbotron extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body">
                <div className="container-fluid">
                    <img src="./images/landing-img.png" className="landing-img" alt="buildings" />
                    <div className="landing-text">
                        <h1 className="large-header">Welcome</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum adipisci ea ex explicabo veniam atque. Unde magni totam explicabo nobis. Error voluptas ipsam odit odio sapiente ad impedit, suscipit soluta?</p>
                        <Link to="/subscribe"><button className="btn input1">REQUEST INFO</button></Link>
                        <Link to="/learn-more"><button className="btn btn2 input1">MORE ABOUT US</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jumbotron;
