import React, {Component} from 'react'

export default class TodoItem extends Component{
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this)
  }
  render() {
    return (
      <div>
        <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle}/>{this.props.todo.title}
      </div>
    );
  }
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }
}
