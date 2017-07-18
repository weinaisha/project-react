import React,{Component} from 'react'

export default class SignInForm extends Component{
    render(){
        return(
            <div className="UserDialog">
          <div className="panes">
            <form className="signIn" onSubmit={this.props.onSubmit.bind(this)}> {/* 登录*/}
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
              <div className="row actions">
                <button type="submit">登录</button>
              </div>
              <div className="row actions">
                <a href="javascript:;" value="signUp"
                onClick={this.props.onSwitchTab.bind(this)}>新建账号</a>
                <a href="javascript:;" value="forgetPassword" 
                onClick={this.props.onSwitchTab.bind(this)}>忘记密码？</a>
              </div>
            </form>
          </div>
        </div>
        )
    }
}