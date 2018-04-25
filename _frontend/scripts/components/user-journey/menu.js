import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="body">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 userMenu">

                        <div className="col-md-4"> 
                        <Link to="/" style={{textDecoration:"none"}}><h1 className="large-header"> Reminizent</h1></Link>
                        </div>
                        {(!this.props.adminLoginToken == '')
                        ?
                        <div className="col-md-1 col-md-offset-7 log-in-btn "><button className="btn pull-right" onClick={this.logOut.bind(this)}>Log Out</button></div>
                        :
                        <Link to="admin-login"><div className="col-md-1 col-md-offset-7 log-in-btn "><button className="btn pull-right">Log In</button></div></Link>
                        }
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        adminLoginToken: state.adminLoginToken
    }
}

export default connect(mapStateToProps)(Menu);