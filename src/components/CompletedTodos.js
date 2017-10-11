import React from "react";
import PropTypes from "prop-types";
import "./CompletedTodos.css";
import TodoListItem from "./TodoListItem.js";

class CompletedTodos extends React.Component {
    render() {
        var completedTodos = this.props.completedTodos.map((item, index) => {
            if (this.props.showCompleted) {
                return <TodoListItem item={item} index={index} key={item.id} isCompleted={true} />;
            }
        });

        return (
            <div className="completed-concerns-container">
                <span className="completed-concerns-link" onClick={this.props.toggleShowCompletedState}>
                    Show Completed Concerns?
                </span>
                <ul className="completed-concerns-list">{completedTodos}</ul>
            </div>
        );
    }
}

CompletedTodos.propTypes = {
    toggleShowCompletedState: PropTypes.func.isRequired,
    showCompleted: PropTypes.bool.isRequired,
};

export default CompletedTodos;
