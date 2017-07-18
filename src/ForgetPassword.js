import React,{Component} from "react"

export default class ForgetPassword extends Component{
    render(){
        return(
            <div className="UserDialog">
                <div className="panes">
                    <form className="signIn" onSubmit={this.props.onSubmit.bind(this)}>
                    <div className="row">
                        <input type="email" value={this.props.formData.email}
                        placeholder="邮箱"
                        onChange={this.props.onChange.bind(this,'email')}/>
                    </div>
                    <div className="row actions">
                        <button type="submit" value="signIn"
                        
                        >重置密码</button>
                    </div>
                    <div className="row actions">
                        <a href="javascript:;" value="signUp"
                        onClick={this.props.onSwitchTab.bind(this)}>新建账号</a>
                        <a href="javascript:;" value="signIn" 
                        onClick={this.props.onSwitchTab.bind(this)}>返回登录</a>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}