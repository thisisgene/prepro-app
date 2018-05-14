import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import logo from '../../assets/img/logo_128.png';
import avatar from '../../assets/img/avatars/av2_128.png';

export default withAuth(class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }
  render() {
    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated
      ? <div className="logged-in-user">
          <img src={avatar} />
          <ul className="auth-nav">
            <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
            <li><a href="javascript:void(0)" onClick={this.props.auth.logout}>Logout</a></li>
          </ul>
        </div>
      : <ul className="auth-nav">
          <li><a href="javascript:void(0)" onClick={this.props.auth.login}>Login</a></li>
          <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
        </ul>;
    return (
      <nav>
        <ul className="menu-list">
          <Link to="/">
            <li className="logo-container">
              <img src={logo} alt='' />
              <h1 className="nav-title">PrePro</h1>
            </li>
          </Link>
          {authNav}
        </ul>

      </nav>

    )
  }
});