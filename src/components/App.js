import React from "react";
import taylor from "../taylor.jpg";
import "../normalize.css";
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
        { id: 1, todo: "So many bugs", owner: "Taylor" },
        { id: 2, todo: "So little time!", owner: "Sönke" },
        { id: 3, todo: "Need more asparagus filet", owner: "Matteo" },
      ],
      completedTodos: [{ todo: "App keeps crashing", owner: "Joe" }],
      showCompleted: false,
    };
  }

  componentWillMount() {
    base.syncState(`/todos/`, {
      context: this,
      state: "todos",
      asArray: true,
    });

    base.syncState(`/completed-todos/`, {
      context: this,
      state: "completedTodos",
      asArray: true,
    });
  }

  addTodo(newTodo, newOwner) {
    var todos = [...this.state.todos];
    var timestamp = Date.now();
    todos.push({
      todo: newTodo,
      owner: newOwner,
      id: timestamp,
    });
    this.setState({
      todos: todos,
    });
  }

  editTodo(index) {
    console.log("todo is being edited");

    var todos = [...this.state.todos];
    todos.map(item => {
      return (item.isEditing = false);
    });

    var todo = todos[index];
    todo.isEditing = true;

    this.setState({
      todos: todos,
    });
  }

  commitEdit = (index, updatedTodo, updatedOwner) => {
    var todos = [...this.state.todos];
    var todo = todos[index];
    todo.todo = updatedTodo;
    todo.owner = updatedOwner;
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
