import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data.items });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { loading, users, alert } = this.state;

    return (
      <div className='App'>
        <NavBar />
        <Alert alert={alert} />
        <Search
          showClear={users.length > 0}
          clearUsers={this.clearUsers}
          searchUsers={this.searchUsers}
          setAlert={this.setAlert}
        />
        <div className='container'>
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
