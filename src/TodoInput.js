import React,{Component} from 'react'

export default class TodoInput extends Component{
    render(){
        return (
            <div className="todoInput">
                <input type="text" defaultValue={this.props.content}
                onKeyPress={this.submit}/>
            </div>
        )
    }
    submit(e){
        if (e.key === 'Enter') {
          console.log('用户按回车了');
          this.props.onSubmit()
        }
    }
}