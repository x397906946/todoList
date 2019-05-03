import React, { Component } from 'react';
import '../../node_modules/normalize.css/normalize.css'
import '../css/reset.css'
import '../css/App.css';
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'

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
    this.onSignUpOrSignIn = this.onSignUpOrSignIn.bind(this)
    this.signOut = this.signOut.bind(this)

    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user, todos => {
        let stateCopy = deepCopy(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
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
                     onSubmit={this.addTodo}
                     onChange={this.changeTitle}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null :
          <UserDialog onSignUp={this.onSignUpOrSignIn}
                      onSignIn={this.onSignUpOrSignIn}/>}
      </div>
    )
  }
  addTodo(e){
    let newTodo = {
      title: e.target.value,
      status: null,
      deleted: false
    }
    TodoModel.create(newTodo, id => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, error => {
      console.log(error)
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
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  onSignUpOrSignIn(user){
    let stateCopy = deepCopy(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(){
    signOut()
    let stateCopy = deepCopy(this.state)
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

function deepCopy(obj){
  return JSON.parse(JSON.stringify(obj))
}

export default App;
