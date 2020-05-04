import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import styles from './Header.module.scss';
import UsersApiService from '../../services/users-api-service';

class Header extends Component {
  state = { 
    loading: true,
    user: {},
  };

  static defaultProps = {
    match: {},
    location: {},
  };

  static contextType = UserContext;

  componentDidMount() {
    this.setState({ loading: false });
    this.getUser()
  }

  async getUser() {
    let user = await UsersApiService.getUserById(this.context.user.id)
    this.setState({ user: user[0] })
  }

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className={styles.logoutDiv}>
        <Link to="/" className={styles.homeLink}>
          Cup of Sugar
        </Link>
        <img className={styles.avatarImg} src={this.state.user.img_src} alt={this.state.user.img_alt}></img>
        <nav className={styles.linksContainer}>
          <Link className={styles.threadsLink} to="/threads">
            My Messages
          </Link>
          <Link className={styles.threadsLinkIcon} to="/threads">
            <img src={require('../../images/mail.svg')} alt="my messages" />
          </Link>
          <Link
            onClick={this.handleLogoutClick}
            to="/login"
            className={styles.logoutLink}>
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    const { location } = this.props;
    return (
      <nav className={styles.loginDiv}>
        {location.pathname === '/register' ? (
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        ) : (
          <Link to="/register" className={styles.signUpLink}>
            Sign up
          </Link>
        )}
      </nav>
    );
  }

  render() {
    const { location } = this.props;
    if (this.state.loading === true) {
      return <></>;
    }

    const { pathname } = location;

    return (
      <header
        className={
          pathname === '/register' || pathname === '/login'
            ? styles.Header
            : styles.HeaderWithUnderline
        }>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
