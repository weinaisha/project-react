import React,{Component} from 'react'

export default class TodoItem extends Component{
    render(){
        return(
            <div>
                {this.props.todo.title}
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    delete(){
        this.props.onDelete(this.props.todo)
    }
}