import React, {Component} from 'react'
import '../css/todoInput.css'

export default class TodoInput extends Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
  }
  render() {
    return <input type="text" className="TodoInput" value={this.props.content}
                  onKeyPress={this.submit} onChange={this.changeTitle}/>
  }
  submit(e){
    if(e.key === 'Enter'){
      this.props.onSubmit(e)
    }
  }
  changeTitle(e){
    this.props.onChange(e)
  }
}
