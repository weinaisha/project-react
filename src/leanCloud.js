import AV from 'leancloud-storage'

var APP_ID = '4nFtbOEDR2nuu1gBl6KSMYh8-gzGzoHsz'
var APP_KEY = 'dwH4XnXnqNVtrPM6R8qw8IWm'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default AV
export const TodoModel={
  getByUser(user,successFn,errorFn){
    var query = new AV.Query('Todo')
    query.find().then((todos) => {
      let array=todos.map((todo) => {
        return {id:todo.id,...todo.attributes}
      })
      successFn.call(null, array)
    },(error)=>{
      errorFn && errorFn.call(null, error)
    })
  },
  //新建
  create({status, title,deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo') 
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()//新建一个 ACL 实例
    acl.setReadAccess(AV.User.current(), true) // 设置「读」权限
    acl.setWriteAccess(AV.User.current(), true) //为当前用户赋予「写」权限，有且仅有当前用户可以修改这条todo
    todo.setACL(acl);// 将 ACL 实例赋予 todo对象
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })
  },
  //更新
  update({id, title, status,deleted}, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },
  //销毁
  destroy(todoId,successFn,errorFn){
    var todo = AV.Object.createWithoutData('Todo',todoId);
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
      (response)
      }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  },
  //查询
  require(action,actionValue,success,error){
     var query = new AV.Query('Todo')
     query.equalTo(action,actionValue)
     query.find().then((todos) => {
      let array=todos.map((todo) => {
        return {id:todo.id,...todo.attributes}
      })
      success.call(null, array)
     },(error)=>{
       error.call(null,error)
     })
  }
}
//注册
export function signUp(username,password,email,success,error){
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  //设置邮箱
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {
      let user = getUserFromAVUser(loginedUser)
      success.call(null, user)
  }, (function (loginedUser) {
      error.call(null,loginedUser)
  }));
}
//登录
export function signIn(username,password,success,error){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    success.call(null,user)
  }, function (loginedUser) {
    error.call(null,loginedUser)
  });
}
//获取当前用户
export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}
//登出
export function signOut(){
  AV.User.logOut()
  return undefined
}
//重置密码
export function reset(email,success,error){
  AV.User.requestPasswordReset(email).then(function (response) {
    success.call(null,'resetSuccess')
  }, function (response) {
    error.call(null,response)
  });
}
function getUserFromAVUser(AVUser){
  return{
    id:AVUser.id,
    ...AVUser.attributes
  }
}