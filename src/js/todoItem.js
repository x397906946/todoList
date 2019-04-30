import React, {Component} from 'react'
import '../css/todoItem.css'
export default class TodoItem extends Component{
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }
  render() {
    return (
      <div className="TodoItem">
        <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle}/>
          <span className="title">{this.props.todo.title}</span>
          <button onClick={this.delete}>删除</button>
      </div>
    );
  }
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }
  delete(e){
    this.props.onDelete(e, this.props.todo)
  }
}
