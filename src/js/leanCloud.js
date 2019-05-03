import AV from 'leancloud-storage'

const APP_ID = '5yHWnw8oWrl1J1PjgPBjVWU9-gzGzoHsz'
const APP_KEY = 'i2jOYnfTMY6JOOsKBOw5WVyL'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

//所有跟Todo相关的操作都放到一起
export const TodoModel ={
  create({status, title, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    //根据文档设置单用户权限
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl)

    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })
  },
  getByUser(user, successFn, errorFn){
    let query = new AV.Query('Todo')
    query.find().then(response => {
      let array = response.map(t => {
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, error => {
      errorFn && errorFn.call(null, error)
    })
  },
  update({id, title, status, deleted}, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', id)
    //对参数局部更新并满足置空处理
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    todo.save().then(response => {
      successFn && successFn.call(null)
    }, error => {
      errorFn && errorFn.call(null, error)
    })
  },
  destroy(todoId, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', todoId)
    todo.destroy().then(response => {
      successFn && successFn.call(null)
    }, error => {
      errorFn && errorFn.call(null, error)
    })
  }
}
export function signUp(email, username, password, successFn, errorFn){
  let user = new AV.User()
  user.setUsername(username) //设置用户名
  user.setPassword(password) //设置密码
  user.setEmail(email) //设置邮箱
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

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
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
