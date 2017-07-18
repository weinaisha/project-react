import AV from 'leancloud-storage'

var APP_ID = '4nFtbOEDR2nuu1gBl6KSMYh8-gzGzoHsz'
var APP_KEY = 'dwH4XnXnqNVtrPM6R8qw8IWm'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export const TodoModel={
  create({status, title, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo') 
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  }
}

export default AV
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