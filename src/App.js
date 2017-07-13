import React,{Component} from 'react'
import TodoInput from './TodoInput'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      newTodo:'test',
      TodoList:[
        {id:1,title:'test1'},
        {id:2,title:'test2'}
      ]
    }
  }
  render(){
    let todos=this.state.TodoList.map((item,index)=>{
      return <li key={index}>{item.title}</li>
    })

    return (
      <div className='TodoWrapper'>
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo} />
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
} 
export default App