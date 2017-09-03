import React, { Component } from 'react';

class CompletedTodos extends React.Component {

	render() {
		var completedTodos = this.props.completedTodos.map( (item, index) => {
			if (this.props.showCompleted) {
				return(
					<li key={index}>
						{item.todo}
					</li>
				)
			}
		})

		return(
			<div className="completed">
				<p className="show-completed" onClick={this.props.toggleShowCompletedState}>Show Completed Todos?</p>
				<ul>
					{completedTodos}
				</ul>
			</div>
		)
	}


}

CompletedTodos.propTypes = {
	toggleShowCompletedState: React.PropTypes.func.isRequired,
	showCompleted: React.PropTypes.bool.isRequired
}

export default CompletedTodos;