import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
    constructor() {
        super();

        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleAddTodo(event) {
        event.preventDefault();
        console.log(this.newTodo.value, this.newOwner.value);
        if (this.newTodo.value.length > 0) {
            this.props.addTodo(this.newTodo.value, this.newOwner.value);
        }
        this.newTodo.value = "";
        this.newOwner.value = "";
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
                    <input placeholder="Type a concern..." ref={newTodo => this.newTodo = newTodo} />
                    <input placeholder="Assign an owner..." ref={newOwner => this.newOwner = newOwner} />
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