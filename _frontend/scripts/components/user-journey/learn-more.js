import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class LearnMore extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="body">

                <div className="container-fluid">
                    <img src="./images/landing-img.png" className="landing-img" alt="buildings" />
                    <div className="landing-text">
                        <h1 className="large-header">Learn More</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum adipisci ea ex explicabo veniam atque. Unde magni totam explicabo nobis. Error voluptas ipsam odit odio sapiente ad impedit, suscipit soluta?</p>
                        <Link to="/"><button className="btn input1">Return Home</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LearnMore;