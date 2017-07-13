import React,{Component} from 'react'
import'./TodoInput.css'

export default class TodoInput extends Component{
    render(){
        return (
            <div>
                <input className="TodoInput" type="text" value={this.props.content}
                onKeyPress={this.submit.bind(this)}
                onChange={this.changeTitle.bind(this)}/>
            </div>
        )
    }
    submit(e){
        if (e.key === 'Enter') {
          this.props.onSubmit(e)
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}