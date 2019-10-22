import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data.items });
  };

  getUser = async username => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, user: res.data });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, repos: res.data });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { loading, users, alert, user, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar />
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    showClear={users.length > 0}
                    clearUsers={this.clearUsers}
                    searchUsers={this.searchUsers}
                    setAlert={this.setAlert}
                  />
                  <div className="container">
                    <Users loading={loading} users={users} />
                  </div>
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
