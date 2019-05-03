import React, {Component} from 'react'
import '../css/todoInput.css'

function submit(props, e) {
  if(e.key === 'Enter'){
    props.onSubmit(e)
  }
}

function changeTitle(props, e) {
  props.onChange(e)
}

export default function (props) {
  return <input type="text" className="TodoInput" value={props.content}
                onKeyPress={submit.bind(null, props)}
                onChange={changeTitle.bind(null, props)}/>
}
