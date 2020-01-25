import React, { Component } from "react";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "../styles/App.css";
import "../styles/Dashboard.css";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import ListItem from "../components/ListItem";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      title: "",
      content: "",
      isAuthorized: true,
      userId: "",
      todos: [
        {
          title: "ok",
          checked: true
        },
        {
          title: "not ok",
          checked: false
        }
      ],
      currentTab: "all"
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/api/todos",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authorization")
      }
    })
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
      .catch(err => {
        toast.error("Please Login again");
        this.setState({
          isAuthorized: false
        });
      });
  }

  onCheckHandler(value) {
    console.log("cv", value);

    axios({
      method: "patch",
      url: "/api/todos/" + value._id,
      headers: {
        authorization: "Bearer " + localStorage.getItem("authorization")
      },
      data: {
        checked: !value.checked
      }
    })
      .then(response => {
        console.log("Response", response);
      })
      .catch(err => {});

    let tempItems = this.state.todos;
    for (let i = 0; i < tempItems.length; i++) {
      if (tempItems[i]._id == value._id) {
        tempItems[i].checked = !tempItems[i].checked;
      }
    }
    this.setState({ todos: tempItems });
  }

  onEditHandler(value) {}

  onDeleteHandler = value => {
    console.log("dv", value);
  };

  getItemsToDisplay(tab) {
    console.log("Tab : ", tab);
    let tempItems = "";
    if (tab === "all") {
      tempItems = this.state.todos.filter(item => true);
    } else if (tab === "completed") {
      tempItems = this.state.todos.filter(item => item.checked);
    } else if (tab === "remaining") {
      tempItems = this.state.todos.filter(item => !item.checked);
    }

    if (this.state.searchTerm !== "") {
      let searchedItems = tempItems.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          item.content
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase())
      );
      return searchedItems;
    }
    return tempItems;
  }

  tabSelectedHandler = selectedTab => {
    this.setState({
      currentTab: selectedTab
    });
  };

  onSearch = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    if (this.state.isAuthorized) {
      console.log("Current tab from State, ", this.state.currentTab);
      let itemsToDisplay = this.getItemsToDisplay(this.state.currentTab);
      return (
        <div className="dashboard-container">
          <div className="dashboard-card">
            <div className="header-container">
              <div className="dashboard-logo-holder">
                <i className="fas fa-tasks dashboard-logo-icon"></i>tarea
              </div>
              <div className="search-holder">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter your search item..."
                    aria-label="Enter your search item..."
                    aria-describedby="search"
                    value={this.state.searchTerm}
                    onChange={this.onSearch}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="search">
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
            <div className="body-container">
              <Tabs
                defaultActiveKey="all"
                id="tabs"
                onSelect={this.tabSelectedHandler}
              >
                <Tab eventKey="all" title="All" />
                <Tab eventKey="completed" title="Completed" />
                <Tab eventKey="remaining" title="Remaining" />
              </Tabs>
              <div className="list-holder">
                {itemsToDisplay.map((value, index) => {
                  return (
                    <ListItem
                      key={index}
                      data={value}
                      onDelete={event => {
                        this.onDeleteHandler(value);
                      }}
                      onCheck={event => {
                        this.onCheckHandler(value);
                      }}
                      onEdit={event => {
                        this.onEditHandler(value);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

export default Dashboard;
