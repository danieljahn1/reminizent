import React, { Component } from 'react';
class AdminFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (

            <div className="body">
                <div className="container-fuild adminFooter">

                    <div className="col-md-6 col-md-offset-3 text-center footer-links">
                        <a href="#">Help</a>
                        <a href="#">Contact Support</a>
                    </div>
                </div>
                </div>

        )
    }
}

export default AdminFooter;