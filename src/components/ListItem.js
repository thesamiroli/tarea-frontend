import React, { Component } from "react";
import "../styles/ListItem.css";

export class ListItem extends Component {
  render() {
    let deleteIcon = <i className="fas fa-trash-alt delete-icon"></i>;
    let className = this.props.data.checked ? "list-item checked" : "list-item";
    return (
      <div
        className={className}
        onClick={this.props.onClick}
        id={this.props.data._id}
      >
        <div className="todo-title">
          {this.props.data.title}
          <span onClick={this.props.onDelete} className="tick">
            {deleteIcon}
          </span>
        </div>
        <div className="todo-content">{this.props.data.content}</div>
      </div>
    );
  }
}

export default ListItem;
