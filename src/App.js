import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as localStore from './localStore'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      todoList:localStore.load('todoList')||[]
    }
  }
  render(){
    let todos=this.state.todoList
    .filter((item)=>!item.deleted)
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem key={index} todo={item}
          onDelete={this.delete.bind(this)}
          onToggle={this.toggle.bind(this)}/>
        </li>
      )
    })
    return (
      <div className='App'>
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo}
        onSubmit={this.addTodo.bind(this)}
        onChange={this.changeTitle.bind(this)} />
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  componentDidUpdate(){
    localStore.save('todoList', this.state.todoList)
  }
  //新增
  addTodo(e){
    this.state.todoList.push({
      id:getId(),
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
  //删除
  delete(todo){
    todo.deleted=true
    this.setState(this.state)
  }
  //标记已完成/未完成
  toggle(todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
} 
let id=0
function getId(){
  id+=1
  return id
}
export default App