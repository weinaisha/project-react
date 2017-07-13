import React,{Component} from 'react'
import './TodoItem.css'
export  default class TodoItem extends Component{
    render(){
        return(
            <div className="TodoItem">
                <div>
                    <input className="title" type="checkbox" checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)}/>
                    {this.props.todo.title}
                </div>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    delete(){
        this.props.onDelete(this.props.todo)
    }
    toggle(){
        this.props.onToggle(this.props.todo)
    }
}