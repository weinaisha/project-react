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
  create({status, title, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo') 
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()//新建一个 ACL 实例
    acl.setReadAccess(AV.User.current(), true) // 设置公开的「读」权限
    acl.setWriteAccess(AV.User.current(), true) //为当前用户赋予「写」权限，有且仅有当前用户可以修改这条todo
    todo.setACL(acl);// 将 ACL 实例赋予 todo对象
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })
  },
  update({},successFn,errorFn){
    // 第一个参数是 className，第二个参数是 objectId
    var todo = AV.Object.createWithoutData('Todo', '5745557f71cfe40068c6abe0')
    // 修改属性
    todo.set('content', '每周工程师会议，本周改为周三下午3点半。')
    // 保存到云端
    todo.save()
  },
  destroy(){
    var todo = AV.Object.createWithoutData('Todo', '57328ca079bc44005c2472d0');
    todo.destroy().then(function (success) {
      // 删除成功
    }, function (error) {
      // 删除失败
    });
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