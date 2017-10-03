import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import "./TodoList.css";

class TodoList extends React.Component {
    constructor() {
        super();

        this.handleConcernChange = this.handleConcernChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.renderReadOrEdit = this.renderReadOrEdit.bind(this);

        this.state = {
            newTodo: "",
            newOwner: "",
            emptyConcernError: false,
            updatedTodo: "",
            updatedOwner: "",
        };
    }

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

    handleConcernChange(event) {
        var newTodo = event.target.value;
        this.setState({
            newTodo: newTodo,
            emptyConcernError: false,
        });
    }

    handleOwnerChange(event) {
        var newOwner = event.target.value;
        this.setState({
            newOwner: newOwner,
        });
    }

    handleEditTodo(event, index) {
        event.preventDefault();
        var updatedTodo = this.state.updatedTodo;
        var updatedOwner = this.state.updatedOwner;
        this.props.commitEdit(index, updatedTodo, updatedOwner);
        this.setState({
            updatedTodo: "",
            updatedOwner: "",
        });
    }

    handleEditTodoButtonClick = (item, index) => {
        this.props.editTodo(index);
        this.setState({
            updatedTodo: item.todo,
            updatedOwner: item.owner,
        });

        setTimeout(() => this.concernFieldInput.focus(), 0);
    };

    handleAddTodo(event) {
        event.preventDefault();
        console.log(this.state.newTodo, this.state.newOwner);
        if (this.state.newTodo.length > 0) {
            this.props.addTodo(this.state.newTodo, this.state.newOwner);
            this.setState({
                emptyConcernError: false,
            });
        } else {
            this.setState({
                emptyConcernError: true,
            });
        }
        this.setState({
            newTodo: "",
            newOwner: "",
        });
        this.input.focus();
    }

    renderReadOrEdit(item, index) {
        var concernCompleteButton = (
            <span className="concern-item concern-complete">
                <span className="fa fa-circle-thin" style={{ fontSize: "14px" }} onClick={() => this.props.completeTodo(index)} />
            </span>
        );

        if (item.isEditing) {
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
                    <span className="concern-item concern-edit" onClick={() => this.handleEditTodoButtonClick(item, index)}>
                        (edit)
                    </span>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="add-concern-container">
                    <form>
                        <input
                            className="add-concern-concern"
                            placeholder="Type a concern..."
                            value={this.state.newTodo}
                            onChange={this.handleConcernChange}
                            ref={input => {
                                this.input = input;
                            }}
                        />
                        <input
                            className="add-concern-owner"
                            placeholder="Assign an owner..."
                            value={this.state.newOwner}
                            onChange={this.handleOwnerChange}
                        />
                        <button className="add-concern-button" onClick={this.handleAddTodo}>
                            Add Concern
                        </button>
                    </form>
                    {this.state.emptyConcernError && <p className="emptyConcernError">You must enter a concern first!</p>}
                </div>
                <div className="concerns-list">
                    <CSSTransitionGroup component="ul" transitionName="concern-transition" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                        {this.props.todos.map((item, index) => <li key={item.id}>{this.renderReadOrEdit(item, index)}</li>)}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
};

export default TodoList;
