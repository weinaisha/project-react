import React,{Component} from 'react'

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
    let todos=this.state.TodoList.map((item)=>{
      return <li>{item.title}</li>
    })

    return (
      <div className='TodoWrapper'>
        <h1>我的待办</h1>
        <input type='text' value={this.state.newTodo} />
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
} 
export default App