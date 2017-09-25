import React from "react";
import taylor from "../taylor.jpg";
import "./App.css";
import TodoList from "./TodoList.js";
import CompletedTodos from "./CompletedTodos.js";

class App extends React.Component {
  constructor() {
    super();

    this.addTodo = this.addTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.toggleShowCompletedState = this.toggleShowCompletedState.bind(this);

    this.state = {
      todos: [
        { todo: "So many bugs", owner: "Taylor", isEditing: false },
        { todo: "So little time!", owner: "Sönke", isEditing: false },
        { todo: "Need more asparagus filet", owner: "Matteo", isEditing: false },
      ],
      completedTodos: [{ todo: "App keeps crashing", owner: "Joe" }],
      showCompleted: false,
    };
  }

  addTodo(newTodo, newOwner) {
    var todos = [...this.state.todos];
    todos.push({
      todo: newTodo,
      owner: newOwner,
    });
    this.setState({
      todos: todos,
    });
  }

  editTodo(index) {
    console.log("todo is being edited");

    var todos = [...this.state.todos];
    var todo = todos[index];
    todo.isEditing = true;

    this.setState({
      todos: todos,
    });
  }

  commitEdit = (index, updatedTodo) => {
    var todos = [...this.state.todos];
    var todo = todos[index];
    todo.todo = updatedTodo;
    todo.isEditing = false;

    this.setState({
      todos: todos,
    });
  };

  completeTodo(index) {
    var todos = [...this.state.todos];
    var todo = todos[index];
    var completedTodos = [...this.state.completedTodos];

    completedTodos.push(todo);

    todos.splice(index, 1);

    this.setState({
      todos: todos,
      completedTodos: completedTodos,
    });
  }

  toggleShowCompletedState() {
    console.log("show completed toggled");
    this.setState({
      showCompleted: !this.state.showCompleted,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={taylor} className="taylor" alt="logo" />
          <h2>Welcome to my Retro board</h2>
        </div>

        <TodoList
          todos={this.state.todos}
          addTodo={this.addTodo}
          editTodo={this.editTodo}
          completeTodo={this.completeTodo}
          commitEdit={this.commitEdit}
        />

        <CompletedTodos
          completedTodos={this.state.completedTodos}
          showCompleted={this.state.showCompleted}
          toggleShowCompletedState={this.toggleShowCompletedState}
        />
      </div>
    );
  }
}

export default App;
