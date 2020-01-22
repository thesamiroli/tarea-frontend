import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../config/axios";

export class Register extends Component {
  constructor() {
    super();

    this.state = {
      buttonClicked: false,
      userNameErrorMessage: "",
      emailErrorMessage: "",
      email: "",
      password: "",
      username: ""
    };
  }

  onSubmitClick = event => {
    event.preventDefault();
    axios
      .post("/users/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="register-container">
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.emailErrorMessage}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.userNameErrorMessage}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmitClick}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
