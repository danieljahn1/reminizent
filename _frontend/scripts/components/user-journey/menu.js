import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearLoginToken } from '../../redux/actions';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    logOut() {
        this.props.sendTokenToRedux('');
        this.setState({
            redirect: true
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            this.setState({
                redirect: false
            })
            return <Redirect to="/" />
        }

        return (
            <div className="body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 userMenu">

                            <div className="col-md-4">
                                <Link to="/" style={{ textDecoration: "none" }}><h1 className="large-header"> Reminizent</h1></Link>
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

const mapDispatchToProps = dispatch => {
    return {
        sendTokenToRedux: adminLoginToken => dispatch(clearLoginToken(adminLoginToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);