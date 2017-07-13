import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      TodoList:[]
    }
  }
  render(){
    let todos=this.state.TodoList.map((item,index)=>{
      return <TodoItem key={index} todo={item}/>
    })

    return (
      <div className='TodoWrapper'>
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo}
        onSubmit={this.addTodo} />
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
  addTodo(){
    console.log('新增todo')
  }
} 
export default App