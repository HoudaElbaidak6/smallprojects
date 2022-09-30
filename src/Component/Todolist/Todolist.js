import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Todolist.css";

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        content: "",
        completed: false,
        id: 0,
      },
      list: [],
      alert: false,
    };
  }

  handleChange = (e) => {
    this.setState({ task: { content: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { task, list: tasklist } = this.state;
    if (task.content.trim().length !== 0) {
      let specialId = Math.random() * 10000 + "_" + new Date().getTime();
      task.id = specialId;
      task.completed = false;
      tasklist.push(this.state.task);
      this.setState({ list: tasklist });
      console.log(this.state.task);
      // console.log(this.state.list);
      this.setState({ task: { content: "" } });
    } else {
      this.setState({ alert: true });
    }
  };

  handleSingleClick = (index) => {
    let { list: tasklist } = this.state;
    tasklist.splice(index, 1);
    this.setState({ list: tasklist });
  };

  handleComplete = (id) => {
    let { list: tasklist } = this.state;
    tasklist = tasklist.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({ list: tasklist });
  };

  render() {
    let { list, alert } = this.state;

    if (alert === true) {
      setTimeout(() => {
        this.setState({ alert: false });
      }, 10000);
    }
    return (
      <>
        {alert === true ? <p>Please enter a task</p> : ""}
        <div className="containerbg">
          <form onSubmit={this.handleSubmit} className="form">
            <input
              type="text"
              placeholder="enter a task"
              onChange={this.handleChange}
              value={this.state.task.content}
              className="enterTask"
            />
            <button className="add">Add task</button>
          </form>
          <h5 className="title">Task list</h5>
          <div className="divStyle">
            <ol>
              {list.map((item, index) => {
                return (
                  <li key={index} className="style">
                    <div
                      className={
                        item.completed
                          ? "fw-bold text-decoration-line-through "
                          : "fw-bold "
                      }
                    >
                      {item.content}
                    </div>
                    {/* <button>modify</button> */}
                    <div className="formStyle">
                      <button
                        onClick={() => {
                          this.handleSingleClick(index);
                        }}
                        className="deleteBtn"
                      >
                        Delete task
                      </button>
                      <div className="form-check form-switch mx-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={item.completed == true ? true : false}
                          onChange={() => {
                            this.handleComplete(item.id);
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default Todolist;
