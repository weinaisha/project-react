import AV from 'leancloud-storage'

var APP_ID = '4nFtbOEDR2nuu1gBl6KSMYh8-gzGzoHsz';
var APP_KEY = 'dwH4XnXnqNVtrPM6R8qw8IWm';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,success,error){
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  user.signUp().then(function (loginedUser) {
      let user = getUserFromAVUser(loginedUser)
      success.call(null, user)
  }, (function (loginedUser) {
      error.call(null,loginedUser)
  }));
}
function getUserFromAVUser(AVUser){
  return{
    id:AVUser.id,
    ...AVUser.attributes
  }
}
export function signIn(username,password,success,error){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    success.call(null,user)
  }, function (loginedUser) {
    error.call(null,loginedUser)
  });
}
export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}
export function signOut(){
  AV.User.logOut()
  return undefined
}