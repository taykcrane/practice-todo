import React from "react";
import PropTypes from "prop-types";
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
        this.props.commitEdit(index, updatedTodo);
        this.setState({
            updatedTodo: "",
            updatedOwner: "",
        });
    }

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
        if (item.isEditing == true) {
            return (
                <form>
                    <input value={this.state.updatedTodo} onChange={this.handleEditTodoChange} />
                    <input defaultValue={item.owner} />
                    <button onClick={event => this.handleEditTodo(event, index)}>Update concern</button>
                </form>
            );
        } else {
            return (
                <div>
                    <span>{item.todo} -- </span>
                    <span>{item.owner ? `Owner: ${item.owner}  --  ` : null}</span>
                    <span className="complete" onClick={() => this.props.completeTodo(index)}>
                        Done!
                    </span>
                    <span> </span>
                    <span
                        className="edit"
                        onClick={() => {
                            this.props.editTodo(index);
                            this.setState({
                                updatedTodo: item.todo,
                            });
                        }}
                    >
                        (edit)
                    </span>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <ul>{this.props.todos.map((item, index) => <li key={index}>{this.renderReadOrEdit(item, index)}</li>)}</ul>
                <form>
                    <input
                        placeholder="Type a concern..."
                        value={this.state.newTodo}
                        onChange={this.handleConcernChange}
                        ref={input => {
                            this.input = input;
                        }}
                    />
                    <input placeholder="Assign an owner..." value={this.state.newOwner} onChange={this.handleOwnerChange} />
                    <button onClick={this.handleAddTodo}>Add Concern</button>
                </form>
                {this.state.emptyConcernError && <p className="emptyConcernError">You must enter a concern first!</p>}
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
