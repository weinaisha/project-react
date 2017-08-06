基于React框架，LeanCloud平台
* 作用：个人行程管理

* 功能：登录、注册、找回密码、行程增删改查

* 借助LeanCloud平台存储用户数据，并设置用户权限

* 项目架构：一个APP父组件包含四个子组件：TodoInput（输入行程内容）、TodoItem（展示行程内容）、

SingInForm（注册表单）、SingUpForm（登录表单）

* 数据存储：因为组件本身不能修改自己的 props，把会受到用户操作而更新的行程数据/用户信息放到APP父组件的state

中，this.sate={todoList:[]}

* 通讯原理：

1. 父子组件通过props通讯，但由于props只能由父组件向子组件传递属于单向通讯；

2. 子组件向父组件通讯，同样也需要父组件向子组件传递 props 进行通讯，只是父组件传递的是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中；

3. 兄弟组件通讯，把相同的父组件作为通讯的中间站点

* 具体方法：用户在TodoInput子组件中输入需要新建的行程内容，当按下回车时，调用APP父组件通过props传递的自身函数addTodo，并把行程内容（e.value）作为参数。在父组件APP中通过props把this.state.todoList传递给子组件TodoItrm，addTodo函数会修改this.state.todoList=e.value，并调用setState函数将传入的参数对象与组件当前的状态合并,渲染界面按需更新。
