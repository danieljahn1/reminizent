import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearLoginToken } from '../../redux/actions';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectDashboard: false,
            redirectCreateCustomer: false
        }
    }

    logOut() {
        this.props.sendTokenToRedux('');
        this.setState({
            redirect: true
        })
    }

    goToDashboard() {
        this.setState({
            redirectDashboard: true
        })
    }

    goToCreateCustomer() {
        this.setState({
            redirectCreateCustomer: true
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

        const { redirectDashboard } = this.state;
        if (redirectDashboard) {
            this.setState({
                redirectDashboard: false
            })
            return <Redirect to="/admin-dashboard" />
        }

        const { redirectCreateCustomer } = this.state;
        if (redirectCreateCustomer) {
            this.setState({
                redirectCreateCustomer: false
            })
            return <Redirect to="/admin-subscribe" />
        }

        return (
            <div className="body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 userMenu">
                            <div className="row">
                                <div className="col-md-4">
                                    <Link to="/" style={{ textDecoration: "none" }}><h1 className="large-header"> Reminizent</h1></Link>
                                </div>
                                {(!this.props.adminLoginToken == '')
                                    ?
                                    <div className="col-md-7 col-md-push-4 in-line5">
                                        <button className="btn" onClick={this.goToDashboard.bind(this)}>Dashboard</button>
                                        <button className="btn btn3" onClick={this.goToCreateCustomer.bind(this)}>Create Customer</button>
                                        <button className="btn" onClick={this.logOut.bind(this)}>Log Out</button>
                                    </div>
                                    :
                                    <div className="col-md-1 col-md-offset-7 in-line5">
                                        <Link to="/admin-login">
                                            <button className="btn">Log In</button>
                                        </Link>
                                    </div>
                                }
                            </div>
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
