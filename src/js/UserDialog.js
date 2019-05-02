import React, {Component} from 'react';
import '../css/UserDialog.css';
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud';
import SignInOrSignUp from './signInOrSignUp'
import ForgotPasswordForm from './forgotPasswordForm';

export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: '',
      }
    }
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
    this.changeFormData = this.changeFormData.bind(this)
    this.showForgotPassword = this.showForgotPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.returnToSignIn = this.returnToSignIn.bind(this)
  }
  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp formData={this.state.formData}
                            onSignIn={this.signIn}
                            onSignUp={this.signUp}
                            onChange={this.changeFormData}
                            onForgotPassword={this.showForgotPassword}
            /> :
            <ForgotPasswordForm formData={this.state.formData}
                               onSubmit={this.resetPassword}
                               onChange={this.changeFormData}
                               onSignIn={this.returnToSignIn}
            />}
        </div>
      </div>
    )
  }
  signUp(e){
    e.preventDefault()
    let {email, username, password} = this.state.formData
    let success = user => {
      this.props.onSignUp.call(null, user)
    }
    let error = error => {
      switch(error.code){
        case 200:
          alert('没有提供用户名，或者用户名为空。')
          break
        case 201:
          alert('没有提供密码，或者密码为空。')
          break
        case 202:
          alert('用户名已被占用。')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error)
  }
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = user => {
      this.props.onSignIn.call(null, user)
    }
    let error = error => {
      switch (error.code) {
        case 210:
          alert('用户名和密码不匹配。')
          break
        case 211:
          alert('找不到用户。')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData(key, e){
    let stateCopy = deepCopy(this.state)
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  showForgotPassword(){
    let stateCopy = deepCopy(this.state)
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
  returnToSignIn(){
    let stateCopy = deepCopy(this.state)
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
}

function deepCopy(obj){
  return JSON.parse(JSON.stringify(obj))
}
