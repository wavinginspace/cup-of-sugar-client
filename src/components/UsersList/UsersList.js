import React from 'react';
import User from './User/User';
import UserContext from '../../contexts/UserContext';
import styles from './UsersList.module.scss';
import SearchUsers from './SearchUsers/SearchUsers';
import UsersApiService from '../../services/users-api-service';

export default class UsersList extends React.Component {

  state = {
    user: {}
  }

  static contextType = UserContext;

  componentDidMount() {
    this.getUser()
  }

  async getUser() {
    let user = await UsersApiService.getUserById(this.context.user.id)
    this.setState({ user: user[0] })
  }

  render() {
    let users = [];
    if (this.context.filterTouched) {
      users = this.context.filteredUsers.filter(
        user => user.id !== this.context.user.id
      );
    }
    else {
      users = this.context.users.filter(
      user => user.id !== this.context.user.id
    );
    }
    return (
      <section className={styles.userListSection}>
      <h2 className={styles.directoryHeader}>Neighbor Directory</h2>
      <SearchUsers />
      <ul className={styles.UsersList}>
        <div className={styles.usersContainer}>
          {users.map(user => (
            <User user={this.state.user} neighbor={user} key={user.id} />
          ))}
        </div>
      </ul>
      </section>
    );
  }
}
