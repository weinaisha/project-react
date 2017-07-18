import React,{Component} from 'react'

export default class SignUpForm  extends Component{
  render(){
    return(
      <div className="UserDialog">
        <div className="panes">
          <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
            <div className="row">
              <input type="text" value={this.props.formData.username}
              placeholder="用户名"
              onChange={this.props.onChange.bind(this,'username')}/>
            </div>
            <div className="row">
              <input type="password" value={this.props.formData.password}
              placeholder="密码"
              onChange={this.props.onChange.bind(this,'password')}/>
            </div>
            <div className="row">
              <input type="email" value={this.props.formData.email}
              placeholder="邮箱"
              onChange={this.props.onChange.bind(this,'email')}/>
            </div>
            <div className="row actions">
              <button type="submit">注册</button>
            </div>
            <div className="row actions">
              <a href="javascript:void(0)" value="signIn"
              onClick={this.props.onSwitchTab.bind(this)}>已有账号？点击登录</a>
            </div>
          </form>
        </div>
    </div>
    )
  }
}