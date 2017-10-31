import React from "react";
import firebase from "firebase";
import taylor from "../taylor.jpg";
import "../normalize.css";
import "./App.css";
import base from "../base.js";
import TodoList from "./TodoList.js";
import CompletedTodos from "./CompletedTodos.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [
        { id: 1, todo: "So many bugs", owner: "Taylor", createdAt: 0 },
        { id: 2, todo: "So little time!", owner: "Sönke", createdAt: 0 },
        { id: 3, todo: "Need more asparagus filet", owner: "Matteo", createdAt: 0 },
      ],
      completedTodos: [],
      showCompleted: false,
      currentlyEditing: null,
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(
        {
          user: user,
        },
        () => {
          base.syncState(`${this.state.user.uid}/todos/`, {
            context: this,
            state: "todos",
            asArray: true,
          });

          base.syncState(`${this.state.user.uid}/completed-todos/`, {
            context: this,
            state: "completedTodos",
            asArray: true,
          });
        }
      );
    });
  }

  addTodo = (newTodo, newOwner) => {
    var todos = [...this.state.todos];
    var timestamp = Date.now();
    todos.push({
      todo: newTodo,
      owner: newOwner,
      id: timestamp,
      createdAt: timestamp,
    });
    this.setState({
      todos: todos,
    });
  };

  setCurrentlyEditing = id => {
    this.setState({
      currentlyEditing: id,
    });
  };

  commitEdit = (index, updatedTodo, updatedOwner) => {
    var todos = [...this.state.todos];
    var todo = todos[index];
    todo.todo = updatedTodo;
    todo.owner = updatedOwner;

    this.setState({
      todos: todos,
    });
  };

  completeTodo = index => {
    var todos = [...this.state.todos];
    var todo = todos[index];
    var completedTodos = [...this.state.completedTodos];

    completedTodos.unshift(todo);

    todos.splice(index, 1);

    this.setState({
      todos: todos,
      completedTodos: completedTodos,
    });
  };

  unCompleteTodo = index => {
    var completedTodos = [...this.state.completedTodos];
    var completedTodo = completedTodos[index];
    var todos = [...this.state.todos];

    todos.push(completedTodo);
    completedTodos.splice(index, 1);

    this.setState({
      todos: todos,
      completedTodos: completedTodos,
    });
  };

  toggleShowCompletedState = () => {
    console.log("show completed toggled");
    this.setState({
      showCompleted: !this.state.showCompleted,
    });
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={taylor} className="taylor" alt="logo" />
          {this.state.user && <h2>{`Welcome, ${this.state.user.email}. userID=${this.state.user.uid}`}</h2>}
          <a className="logout" onClick={this.logout}>
            Log out
          </a>
        </div>

        <TodoList
          todos={this.state.todos}
          addTodo={this.addTodo}
          completeTodo={this.completeTodo}
          commitEdit={this.commitEdit}
          currentlyEditing={this.state.currentlyEditing}
          setCurrentlyEditing={this.setCurrentlyEditing}
        />

        <CompletedTodos
          completedTodos={this.state.completedTodos}
          showCompleted={this.state.showCompleted}
          toggleShowCompletedState={this.toggleShowCompletedState}
          unCompleteTodo={this.unCompleteTodo}
        />
      </div>
    );
  }
}

export default App;
