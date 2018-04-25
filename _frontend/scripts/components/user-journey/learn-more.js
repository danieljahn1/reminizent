import React, { Component } from 'react';

class LearnMore extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="body">

                <div className="container-fluid">
                    <div className="col-md-12" id="back-img">
                        <div className="landing-text">
                            <h1 className="large-header">Learn More</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum adipisci ea ex explicabo veniam atque. Unde magni totam explicabo nobis. Error voluptas ipsam odit odio sapiente ad impedit, suscipit soluta?</p>
                            <button className="btn input1">Back</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LearnMore;