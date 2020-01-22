import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Dashboard } from "./routes/Dashboard";
import { Todo } from "./routes/Todo";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/:todoId">
            <Todo />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
