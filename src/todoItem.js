import React, {Component} from 'react'

export default class TodoItem extends Component{
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }
  render() {
    return (
      <div>
        <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle}/>{this.props.todo.title}
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
