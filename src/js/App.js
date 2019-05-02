import React, { Component } from 'react';
import '../../node_modules/normalize.css/normalize.css'
import '../css/reset.css'
import '../css/App.css';
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut} from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.signOut = this.signOut.bind(this)
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
        <h1>
          {this.state.user.username || '我'}的待办
          {this.state.user.id ? <button onClick={this.signOut}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
                     onSubmit={this.addTodo} onChange={this.changeTitle}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp} onSignIn={this.onSignIn}/>}
      </div>
    )
  }
  componentDidUpdate() {
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
  }
  changeTitle(e) {
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
}
  delete(e, todo){
    todo.deleted = true
    this.setState(this.state)
  }
  onSignUp(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  onSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

export default App;

let id = 0
function idMaker() {
  return ++id
}
