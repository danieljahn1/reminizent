import React, { Component } from 'react';
class MainFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="body">
                <div className="container-fluid">
                    <div className="col-md-12">
                        <div className="main-footer">
                            <div className="col-md-6 col-md-offset-3 text-center footer-links">
                            <a href="#">Locations</a>
                            <a href="#">Contact Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Feedback</a>

                        </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default MainFooter;
