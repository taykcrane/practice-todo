import React, { Component } from 'react';

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
		var todolist = this.props.todos.map( (item, index) => {
			return(
				<li key={index}>
					<span>{item.todo}  --  </span>
					<span>{item.owner ? `Owner: ${item.owner}  --  ` : null }</span>
					<span className="complete" onClick={ () => this.props.completeTodo(index) }>
						Done!
					</span>
				</li>
			)
		})

		return (
			<div>
				<ul>
					{todolist}
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
	todos: React.PropTypes.array.isRequired,
	addTodo: React.PropTypes.func.isRequired,
	completeTodo: React.PropTypes.func.isRequired,
}

export default TodoList;