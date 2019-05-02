import React, { Component } from 'react';
import '../../node_modules/normalize.css/normalize.css'
import '../css/reset.css'
import '../css/App.css';
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import * as localStore from './localStore'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || []
    }
    this.addTodo = this.addTodo.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }
  render() {
    let todos = this.state.todoList
      .filter(item => !item.deleted)
      .map((item, index) => {
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle} onDelete={this.delete}/>
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
                     onSubmit={this.addTodo} onChange={this.changeTitle}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  addTodo(e){
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    localStore.save('todoList', this.state.todoList)
  }
  changeTitle(e) {
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
    localStore.save('todoList', this.state.todoList)
  }
  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    localStore.save('todoList', this.state.todoList)
  }
  delete(e, todo){
    todo.deleted = true
    this.setState(this.state)
    localStore.save('todoList', this.state.todoList)
  }
}

export default App;

let id = 0
function idMaker() {
  return ++id
}
