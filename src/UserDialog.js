import React,{Component} from 'react'
import {signUp,signIn,reset} from './leanCloud'
import {copyState} from './copyState'
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
          case 503:
            alert('服务器维护中')
            break
          default:
            alert(error)
            break
         }
     }
     signUp(username, password,email,success,error)
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
      let signUpForm = (
        <div className="UserDialog">
          <div className="panes">
            <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
              <div className="row">
                <input type="text" value={this.state.formData.username}
                placeholder="用户名"
                  onChange={this.changeFormData.bind(this,'username')}/>
              </div>
              <div className="row">
                <input type="password" value={this.state.formData.password}
                placeholder="密码"
                  onChange={this.changeFormData.bind(this,'password')}/>
              </div>
              <div className="row">
                <input type="email" value={this.state.formData.email}
                placeholder="邮箱"
                  onChange={this.changeFormData.bind(this,'email')}/>
              </div>
              <div className="row actions">
                <button type="submit">注册</button>
              </div>
              <div className="row actions">
                <a href="javascript:;" value="signIn"
                onClick={this.switchTab.bind(this)}>已有账号？点击登录</a>
              </div>
            </form>
          </div>
        </div>
      )
      let signInForm = (
        <div className="UserDialog">
          <div className="panes">
            <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
              <div className="row">
                <input type="text" value={this.state.formData.username}
                  placeholder="用户名"
                  onChange={this.changeFormData.bind(this,'username')}/>
              </div>
              <div className="row">
                <input type="password" value={this.state.formData.password}
                  placeholder="密码" 
                  onChange={this.changeFormData.bind(this,'password')}/>
              </div>
              <div className="row actions">
                <button type="submit">登录</button>
              </div>
              <div className="row actions">
                <a href="javascript:;" value="signUp"
                onClick={this.switchTab.bind(this)}>新建账号</a>
                <a href="javascript:;" value="forgetPassword" 
                onClick={this.switchTab.bind(this)}>忘记密码？</a>
              </div>
            </form>
          </div>
        </div>
      )
      let forgetPassword =(
        <div className="UserDialog">
          <div className="panes">
            <form className="signIn" onSubmit={this.reset.bind(this)}> {/* 登录*/}
              <div className="row">
                <input type="email" value={this.state.formData.email}
                placeholder="邮箱"
                  onChange={this.changeFormData.bind(this,'email')}/>
              </div>
              <div className="row actions">
                <button type="submit" value="signIn"
                
                >重置密码</button>
              </div>
              <div className="row actions">
                <a href="javascript:;" value="signUp"
                onClick={this.switchTab.bind(this)}>新建账号</a>
                <a href="javascript:;" value="signIn" 
                onClick={this.switchTab.bind(this)}>返回登录</a>
              </div>
            </form>
          </div>
        </div>
      )
     return (
      <div className="UserDialog-Wrapper">
        {this.state.selected === 'signUp' ? signUpForm : null}
        {this.state.selected === 'signIn' ? signInForm : null}
        {this.state.selected === 'forgetPassword' ? forgetPassword : null}
      </div>
     )
   }
 }