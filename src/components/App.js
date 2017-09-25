import React from 'react';
import taylor from '../taylor.jpg';
import "./App.css";
import TodoList from "./TodoList.js";
import CompletedTodos from "./CompletedTodos.js";


class App extends React.Component {
  
  constructor() {
    super();

    this.addTodo = this.addTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.toggleShowCompletedState = this.toggleShowCompletedState.bind(this);

    this.state = {
      todos: [{todo: "So many bugs", owner: "Taylor"},
              {todo: "So little time!", owner: "Sönke"},
              {todo: "Need more asparagus filet", owner: "Matteo"}],
      completedTodos: [{todo: "App keeps crashing", owner: "Joe"}],
      showCompleted: false,
    }
  }


  addTodo(newTodo, newOwner) {
    var todos = [...this.state.todos];
    todos.push({
      todo: newTodo,
      owner: newOwner
    });
    this.setState({
      todos: todos
    })
  }

  completeTodo(index) {
    var todos = [...this.state.todos];
    var todo = todos[index];
    var completedTodos = [...this.state.completedTodos];

    completedTodos.push(todo);

    todos.splice(index, 1);
    
    this.setState({
      todos: todos,
      completedTodos: completedTodos
    })
  }

  toggleShowCompletedState() {
    console.log("show completed toggled");
    this.setState({
      showCompleted: !this.state.showCompleted
    })
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
          completeTodo={this.completeTodo} 
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