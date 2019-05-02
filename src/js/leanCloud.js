import AV from 'leancloud-storage'

const APP_ID = '5yHWnw8oWrl1J1PjgPBjVWU9-gzGzoHsz'
const APP_KEY = 'i2jOYnfTMY6JOOsKBOw5WVyL'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export function signUp(username, password, successFn, errorFn){
  let user = new AV.User()
  user.setUsername(username) //设置用户名
  user.setPassword(password) //设置密码
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}

export function getCurrentUser(){
  let user = AV.User.current()
  return user ? getUserFromAVUser(user) : null;
}

export function signOut() {
  AV.User.logOut()
  return undefined
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}
