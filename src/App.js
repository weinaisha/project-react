import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      todoList:[]
    }
  }
  render(){
    let todos=this.state.todoList.map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem key={index} todo={item}/>
        </li>
      )
    })

    return (
      <div className='TodoWrapper'>
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo}
        onSubmit={this.addTodo.bind(this)}
        onChange={this.changeTitle.bind(this)} />
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
  addTodo(e){
    this.state.todoList.push({
      id:1,
      title:e.target.value,
      status:'',
      deleted:false
    })
    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })//按下回车后清空输入框
  }
  changeTitle(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }
} 
export default App