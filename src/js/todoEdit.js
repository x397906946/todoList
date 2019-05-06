import React from 'react';
import '../css/editTodo.css';

function submit(props, e) {
  if(e.key === 'Enter'){
    props.onSubmit(e, props.todo)
  }
}

export default function (props) {
  return <input type="text" placeholder="在此编辑并按回车保存"
                className="editTodo"
                onKeyPress={submit.bind(null, props)}/>
}
