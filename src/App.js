import React,{Component} from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {copyState} from './copyState'
import OptionTab from './OptionTab'
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
    let user = getCurrentUser()//刷新获取当前用户所创建的todo
    if (user) {
      TodoModel.getByUser(user,(todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }
  render(){
    let todos=this.state.todoList
    // .filter((item)=>item.status!=='deleted'&&!item.destroy)
    .map((item,index)=>{
      return (
        <TodoItem key={index} index={index} todo={item}
          onDelete={this.delete.bind(this)}
          onToggle={this.toggle.bind(this)}
        />
      )
    })
    return (
      <div className='App'>
        <aside>
          <header>
            <h1>Todo List</h1>
            {this.state.user.id ?<svg onClick={this.signOut.bind(this)} className="iconSignOut" viewBox="0 0 1024 1024" width="30" height="30">
              <path fill="#fff" d="M736.375 119.712v73.93c115.307 73.821 191.735 203.044 191.735 350.12 0 229.438-185.99 415.427-415.427 415.427-229.43 0-415.427-185.99-415.427-415.427 0-147.075 76.43-276.297 191.735-350.119v-73.93c-152.038 80.37-255.646 240.11-255.646 424.05 0 264.729 214.61 479.338 479.339 479.338 264.736 0 479.34-214.61 479.34-479.339-0.002-183.94-103.61-343.68-255.65-424.05z"/>
              <path fill="#fff" d="M512.683 511.806c17.646 0 31.956-14.31 31.956-31.956V32.467c0-17.653-14.31-31.956-31.956-31.956-17.653 0-31.956 14.303-31.956 31.956V479.85c0 17.647 14.303 31.956 31.956 31.956z"/>
            </svg> : null}
          </header>
            <OptionTab selectTab={this.selectTab.bind(this)}/>
        </aside>
        <div className="content">
          <header>
            <TodoInput content={this.state.newTodo}
            onSubmit={this.addTodo.bind(this)}
            onChange={this.changeTitle.bind(this)} />
          </header>
          <div className="todoList-ct">
            <ol className="todoList">
              {todos}
            </ol>
          </div>
          {this.state.user.id ?
            null : 
            <UserDialog 
              onSignUp={this.onSignUpOrSignIn.bind(this)}
              onSignIn={this.onSignUpOrSignIn.bind(this)}
            />}
        </div>
      </div>
    )
  }
  //查询
  selectTab(action,actionValue){
    console.log('查询开始')
    TodoModel.require(action,actionValue,(todos) => {
        let stateCopy = copyState(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
    },(error)=>alert(error))
  }
  //新增todo
  addTodo(e){
    let newTodo={
      title:e.target.value,
      status:'undone',
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
  delete(todo,index){
    let oldStatus=todo.status
    if(todo.deleted){
      TodoModel.destroy(todo.id,()=>{
        this.state.todoList.splice(index,1)
        this.setState(this.state)
      })
      return false
    }
    todo.deleted=true
    this.state.todoList.splice(index,1)
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status=oldStatus
      this.setState(this.state)
    })
  }
  //标记已完成/未完成
  toggle(todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'done' ? 'undone' : 'done'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status=oldStatus
      this.setState(this.state)
    })
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