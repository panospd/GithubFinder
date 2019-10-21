import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <h1>Hello from Mint 19 linux distro</h1>
      </div>
    );
  }
}

export default App;
