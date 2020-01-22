import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../config/axios";
import "../styles/App.css";
import { Link } from "react-router-dom";

export class Register extends Component {
  constructor() {
    super();

    this.state = {
      buttonClicked: false,
      email: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      username: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      password: ""
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
        <div className="register-card">
          <div className="logo-holder">
            <i className="fas fa-tasks logo-icon"></i>tarea
          </div>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email..."
                value={this.state.email.value}
                onChange={this.onChangeHandler}
                isInvalid={this.state.email.isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.email.invalidMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username..."
                value={this.state.username.value}
                onChange={this.onChangeHandler}
                isInvalid={this.state.username.isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.username.invalidMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password..."
                value={this.state.password}
                onChange={this.onChangeHandler}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSubmitClick}
            >
              Register
            </Button>
          </Form>
          <div className="login-link">
            Already a member? <Link to="/login"> Login here </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
