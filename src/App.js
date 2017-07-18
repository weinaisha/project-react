import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      user:getCurrentUser()||{},
      newTodo:'',
      todoList:[]
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
        <h1>TodoList</h1>
          {this.state.user.id ?<svg onClick={this.signOut.bind(this)} className="iconSignOut" viewBox="0 0 1024 1024" width="30" height="30">
            <path d="M736.375 119.712v73.93c115.307 73.821 191.735 203.044 191.735 350.12 0 229.438-185.99 415.427-415.427 415.427-229.43 0-415.427-185.99-415.427-415.427 0-147.075 76.43-276.297 191.735-350.119v-73.93c-152.038 80.37-255.646 240.11-255.646 424.05 0 264.729 214.61 479.338 479.339 479.338 264.736 0 479.34-214.61 479.34-479.339-0.002-183.94-103.61-343.68-255.65-424.05z"/>
            <path d="M512.683 511.806c17.646 0 31.956-14.31 31.956-31.956V32.467c0-17.653-14.31-31.956-31.956-31.956-17.653 0-31.956 14.303-31.956 31.956V479.85c0 17.647 14.303 31.956 31.956 31.956z"/>
          </svg> : null}
        <TodoInput content={this.state.newTodo}
        onSubmit={this.addTodo.bind(this)}
        onChange={this.changeTitle.bind(this)} />
        <ol className="todoList">
          {todos}
        </ol>
         {this.state.user.id ?
          null : 
          <UserDialog 
          onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }
  componentDidUpdate(){
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
  onSignUpOrSignIn(user){
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user=user
    this.setState(stateCopy)
  }
  signOut(){
    console.log(111)
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
} 
let id=0
function getId(){
  id+=1
  return id
}
// function getRandomColor(){
//     return Math.floor(0x1000000 + Math.random() * 0x1000000)
//                 .toString(16).slice(1)
//   }
export default App