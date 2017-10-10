import React from "react";
import Moment from "react-moment";
import "./TodoListItem.css";

export default class TodoListItem extends React.Component {
  constructor() {
    super();

    this.state = {
      updatedTodo: "",
      updatedOwner: "",
    };
  }

  handleEditTodo = (event, index) => {
    event.preventDefault();
    var updatedTodo = this.state.updatedTodo;
    var updatedOwner = this.state.updatedOwner;
    this.props.commitEdit(index, updatedTodo, updatedOwner);
    this.props.setCurrentlyEditing(null);
    this.setState({
      updatedTodo: "",
      updatedOwner: "",
    });
  };

  handleEditTodoChange = event => {
    var updatedTodo = event.target.value;
    this.setState({
      updatedTodo: updatedTodo,
    });
  };

  handleEditOwnerChange = event => {
    var updatedOwner = event.target.value;
    this.setState({
      updatedOwner: updatedOwner,
    });
  };

  handleSetCurrentlyEditing = item => {
    this.props.setCurrentlyEditing(item.id);

    this.setState({
      updatedTodo: item.todo,
      updatedOwner: item.owner,
    });

    setTimeout(() => this.concernFieldInput.focus(), 0);
  };

  renderReadOrEdit = (item, index) => {
    var concernCompleteButton = (
      <span className="concern-item concern-complete">
        <span className="fa fa-circle-thin" style={{ fontSize: "14px" }} onClick={() => this.props.completeTodo(index)} />
      </span>
    );

    var concernEditButton = isCompleted => {
      if (!isCompleted) {
        return (
          <span className="concern-item concern-edit" onClick={() => this.handleSetCurrentlyEditing(item)}>
            (edit)
          </span>
        );
      } else {
        return null;
      }
    };

    if (this.props.currentlyEditing === item.id) {
      return (
        <div className="edit-concern-container">
          <form>
            {concernCompleteButton}
            <input
              className="concern-name-edit"
              value={this.state.updatedTodo}
              onChange={this.handleEditTodoChange}
              ref={input => {
                this.concernFieldInput = input;
              }}
            />
            <input className="concern-owner-edit" value={this.state.updatedOwner} onChange={this.handleEditOwnerChange} />
            <span className="concern-created-at">
              <Moment format="MMM D">{item.createdAt}</Moment>
            </span>
            <button className="concern-update-edit" onClick={event => this.handleEditTodo(event, index)}>
              Update
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="concern-container">
          {concernCompleteButton}
          <span className="concern-item concern-name">{item.todo}</span>
          <span className="concern-item concern-owner">{item.owner ? `Owner: ${item.owner}` : null}</span>
          <span className="concern-item concern-created-at">
            <Moment format="MMM D">{item.createdAt}</Moment>
          </span>
          {concernEditButton(this.props.isCompleted)}
        </div>
      );
    }
  };

  render() {
    return <li>{this.renderReadOrEdit(this.props.item, this.props.index)}</li>;
  }
}
