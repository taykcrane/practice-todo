import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
    constructor() {
        super();

        this.handleConcernChange = this.handleConcernChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);

        this.state = {
            newTodo: "",
            newOwner: "",
        }
    }

    handleConcernChange(event) {
        var newTodo = event.target.value;
        this.setState({
            newTodo: newTodo
        });
    }

    handleOwnerChange(event) {
        var newOwner = event.target.value;
        this.setState({
            newOwner: newOwner
        });
    }

    handleAddTodo(event) {
        event.preventDefault();
        console.log(this.state.newTodo, this.state.newOwner);
        if (this.state.newTodo.length > 0) {
            this.props.addTodo(this.state.newTodo, this.state.newOwner);
        }
        this.setState({
            newTodo: "",
            newOwner: ""
        });
    }
        
    render() {
        return (
            <div>
                <ul>
                    {this.props.todos.map( (item, index) =>
                        <li key={index}>
                            <span>{item.todo}  --  </span>
                            <span>{item.owner ? `Owner: ${item.owner}  --  ` : null }</span>
                            <span className="complete" onClick={ () => this.props.completeTodo(index) }>
                                Done!
                            </span>
                        </li>
                    )}
                </ul>
                <form>
                    <input placeholder="Type a concern..." onChange={this.handleConcernChange} />
                    <input placeholder="Assign an owner..." onChange={this.handleOwnerChange} />
                    <button onClick={this.handleAddTodo}>Add Concern</button>
                </form>
            </div>
        )
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
}

export default TodoList;