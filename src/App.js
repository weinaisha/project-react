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
      return <TodoItem key={index} todo={item}/>
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
    
  }
  changeTitle(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }
} 
export default App