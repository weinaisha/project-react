import React,{Component} from 'react'
import {signUp,signIn} from './leanCloud'
import './UserDialog.css'

export default class UserDialog extends Component{
    constructor(props){
      super(props)
      this.state = {
        selected: 'signUp',
        formData:{
            username:'',
            password:''
        }
      }
    }
    //切换登录/注册
    switch(e){
        this.setState({
            selected:e.target.value,
            formData:{
                username:'',
                password:''
            }
        })
    }
    changeFormData(key,e){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }
     //注册
    signUp(e){
     e.preventDefault()
     let {username, password} = this.state.formData
     let success = (user)=>{
       this.props.onSignUp.call(null,user)
     }
     let error = (error)=>{
       console.log(error)
        switch(error.code){
          case 202:
            alert('用户名已被占用')
            break
          case 503:
            alert('服务器维护中')
            break
          default:
            alert(error)
            break
         }
     }
     signUp(username, password, success, error)
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
   render(){
     let signUpForm = (
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
         <div className="row actions">
           <button type="submit">注册</button>
         </div>
       </form>
     )
     let signInForm = (
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
       </form>
     ) 
     return (
       <div className="UserDialog-Wrapper">
         <div className="UserDialog">
           <nav>
             <label>
                <input type="radio" value="signUp" 
                checked={this.state.selected === 'signUp'}
                onChange={this.switch.bind(this)}/> 注册
             </label>
             <label>
                <input type="radio" value="signIn" 
                checked={this.state.selected === 'signIn'}
                onChange={this.switch.bind(this)}/> 登录
             </label>
           </nav>
           <div className="panes">
             {this.state.selected === 'signUp' ? signUpForm : null}
             {this.state.selected === 'signIn' ? signInForm : null}
           </div>
         </div>
       </div>
     )
   }
    
 }