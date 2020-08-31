import ajax from './ajax.js'

export const reqLogin=(username,password)=>ajax("http://39.100.225.255:5000/login",{username,password},"POST")

//添加用户
export const reqAddUse=(user)=>ajax("manage/user/add",user,"POST")