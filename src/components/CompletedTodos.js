import React from "react";
import PropTypes from "prop-types";

class CompletedTodos extends React.Component {
	render() {
		var completedTodos = this.props.completedTodos.map((item, index) => {
			if (this.props.showCompleted) {
				return <li key={index}>{item.todo}</li>;
			}
		});

		return (
			<div className="completed">
				<p className="show-completed" onClick={this.props.toggleShowCompletedState}>
					Show Completed Concerns?
				</p>
				<ul>{completedTodos}</ul>
			</div>
		);
	}
}

CompletedTodos.propTypes = {
	toggleShowCompletedState: PropTypes.func.isRequired,
	showCompleted: PropTypes.bool.isRequired,
};

export default CompletedTodos;
