import React,{Component} from 'react'

export default class TodoInput extends Component{
    render(){
        return (
            <div className="todoInput">
                <input type="text" value={this.props.content}/>
            </div>
        )
    }
}