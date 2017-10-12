import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import "./CompletedTodos.css";
import "./TodoListTransitions.css";
import TodoListItem from "./TodoListItem.js";

class CompletedTodos extends React.Component {
	render() {
		var completedTodos = this.props.completedTodos.map((item, index) => {
			if (this.props.showCompleted) {
				return <TodoListItem item={item} index={index} key={item.id} isCompleted={true} unCompleteTodo={this.props.unCompleteTodo} />;
			}
		});

		return (
			<div className="completed-concerns-container">
				<span className="completed-concerns-link" onClick={this.props.toggleShowCompletedState}>
					&or; Show Completed Concerns &or;
				</span>
				<CSSTransitionGroup
					component="ul"
					className="completed-concerns-list"
					transitionName="concern-transition"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
				>
					{completedTodos}
				</CSSTransitionGroup>
			</div>
		);
	}
}

CompletedTodos.propTypes = {
	toggleShowCompletedState: PropTypes.func.isRequired,
	showCompleted: PropTypes.bool.isRequired,
};

export default CompletedTodos;
