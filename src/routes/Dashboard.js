import React, { Component } from "react";

export class Dashboard extends Component {
  constructor() {
    super();
    console.log(localStorage.getItem("Authorization"));
    this.state = {
      userId: "",
      todos: ""
    };
  }
  render() {
    const t = "ssss";
    return (
      <div className="container">
        <div className="card"></div>
      </div>
    );
  }
}

export default Dashboard;
