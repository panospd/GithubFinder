import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await Axios.get('https://api.github.com/users');

    this.setState({ loading: false, users: res.data });
  }
  render() {
    return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
