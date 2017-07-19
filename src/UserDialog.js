import React,{Component} from 'react'
import {signUp,signIn,reset} from './leanCloud'
import {copyState} from './copyState'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import ForgetPassword from './ForgetPassword'
import './UserDialog.css'

export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selected: 'signIn',
      formData:{
          username:'',
          password:'',
          email:''
      }
    }
  }
  //切换登录/注册
  switchTab(e){
    this.setState({
      selected:e.target.getAttribute('value'),
      formData:{
        username:'',
        password:''
      }
    })
    console.log('切换登录/注册')
  }
  changeFormData(key,e){
      let stateCopy=copyState(this.state)
      stateCopy.formData[key]=e.target.value
      this.setState(stateCopy)
  }
  //注册
  signUp(e){
    e.preventDefault()
    let {username, password,email} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null,user)
    }
    let error = (error)=>{
      console.log(error)
      switch(error.code){
        case 202:
          alert('用户名已被占用')
          break
        case 203:
          alert('电子邮箱地址已经被占用')
          break
        case 503:
          alert('服务器维护中')
          break
        default:
          alert(error)
          break
        }
    }
    if(/.{4,}/.test(username)&&/.{6,}/.test(password)&&/@/.test(email)){
      signUp(username, password,email,success,error)
    }
    if(!/.{4,}/.test(username)){
      alert('用户名必须大于三个字符')
    }
    if(!/.{6,}/.test(password)){
      alert('密码必须不小于6个字符')
    }
  }
  //登录
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null,user)
    }
    let error = (error)=>{
      console.log(error)
        switch(error.code){
          case 210:
            alert('用户名与密码不匹配')
            break
          case 211:
            alert('用户名不存在')
            break
          case 503:
            alert('服务器维护中')
            break
          default:
            alert(error)
            break
        }
    }
    signIn(username, password, success, error) 
  }
  //重置密码
  reset(e){
    e.preventDefault()
    let {email} = this.state.formData
    let success=(success)=>{
      this.switchTab(success)
      console.log(success)
    }
    let error=(error)=>{
      switch(error.code){
        case 205:
          alert(' 找不到电子邮箱地址对应的用户')
          break
        default:
          alert(error)
          break
      }
    }
    reset(email,success,error)
  }
  render(){
    return (
    <div className="UserDialog-Wrapper">
      {this.state.selected === 'signUp' ? 
        <SignUpForm formData={this.state.formData}
          onSubmit={this.signUp.bind(this)}
          onChange={this.changeFormData.bind(this)}
          onSwitchTab={this.switchTab.bind(this)}
        />
        : null}
      {this.state.selected === 'signIn' ? 
        <SignInForm formData={this.state.formData}
          onSubmit={this.signIn.bind(this)}
          onChange={this.changeFormData.bind(this)}
          onSwitchTab={this.switchTab.bind(this)}
        />
        : null}
      {this.state.selected === 'forgetPassword' ?
        <ForgetPassword formData={this.state.formData}
          onChange={this.changeFormData.bind(this)}
          onSwitchTab={this.switchTab.bind(this)}
          onSubmit={this.reset.bind(this)}
        />
        : null}
    </div>
    )
  }
 }