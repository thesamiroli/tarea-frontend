import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export class AddTodo extends Component {
  render() {
    console.log("Modal", this.props.show);
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Here should be an Input field</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddTodo;
