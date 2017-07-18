import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {copyState} from './copyState'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'
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
  // getByUser(){
  //   let user = getCurrentUser()
  //   if (user) {
  //     TodoModel.getByUser(user, (todos) => {
  //       let stateCopy = copyState(this.state)
  //       stateCopy.todoList = todos
  //       this.setState(stateCopy)
  //     })
  //   }
  // }
  //新增todo
  addTodo(e){
    let newTodo={
      title:e.target.value,
      status:'',
      deleted:false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id=id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo:'',
        todoList:this.state.todoList
      })//按下回车后清空输入框
    },(error)=>{
      alert(error)
    })
  }
  changeTitle(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }
  //删除todo
  delete(todo){
    todo.deleted=true
    this.setState(this.state)
  }
  //标记已完成/未完成
  toggle(todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  //登录/注册后展示todolist
  onSignUpOrSignIn(user){
    TodoModel.getByUser(user, (todos) => {
      let stateCopy = copyState(this.state)
      stateCopy.todoList = todos
      stateCopy.user=user
      this.setState(stateCopy)
    })
  }
  //登出
  signOut(){
    signOut()
    let stateCopy=copyState(this.state)
    stateCopy.user = {}
    stateCopy.todoList = []
    this.setState(stateCopy)
  }
} 
export default App