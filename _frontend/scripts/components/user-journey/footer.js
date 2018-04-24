import React, { Component } from 'react';

class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-md-6">
                                <a href="#">About</a>
                                <a href="#">Press</a>
                                <a href="#">Developers</a>
                                <a href="#">Channels</a>
                                <a href="#">Sport</a>
                                <a href="#">Culture</a>
                                <a href="#">Privacy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
};

export default Footer;