import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import "./TodoList.css";
import "./TodoListTransitions.css";
import TodoListItem from "./TodoListItem.js";

class TodoList extends React.Component {
    constructor() {
        super();

        this.state = {
            newTodo: "",
            newOwner: "",
            emptyConcernError: false,
        };
    }

    handleConcernChange = event => {
        var newTodo = event.target.value;
        this.setState({
            newTodo: newTodo,
            emptyConcernError: false,
        });
    };

    handleOwnerChange = event => {
        var newOwner = event.target.value;
        this.setState({
            newOwner: newOwner,
        });
    };

    handleAddTodo = event => {
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
    };

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
                    {this.state.emptyConcernError && <p className="empty-concern-error">You must enter a concern first!</p>}
                </div>
                <div className="concerns-list">
                    <CSSTransitionGroup component="ul" transitionName="concern-transition" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                        {this.props.todos.map((item, index) => (
                            <TodoListItem
                                commitEdit={this.props.commitEdit}
                                completeTodo={this.props.completeTodo}
                                currentlyEditing={this.props.currentlyEditing}
                                setCurrentlyEditing={this.props.setCurrentlyEditing}
                                item={item}
                                index={index}
                                key={item.id}
                            />
                        ))}
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
