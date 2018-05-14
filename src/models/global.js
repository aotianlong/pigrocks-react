import localStore from "../lib/store"
import httpClient from "../lib/http_client"
import User from "../resources/User"
import Jsona from "jsona"
import pathToRegexp from "path-to-regexp"
import { message } from "antd"
import UrlMatcher from "../lib/UrlMatcher"
import { SubmissionError} from "redux-form"


import Group from "../resources/Group"
import Tweet from "../resources/Tweet"
import Blog from "../resources/Blog"
import GroupTopic from "../resources/GroupTopic"
import Message from "../resources/Message"
import Notification from "../resources/Notification"
import { push } from "react-router-redux"

export default {
  namespace: 'global',
  state: {
    currentUser: null
  },
  reducers: {

    setState(state,action){
      return {...state,...action.state}
    },

    setCurrentUser(state,action){
      localStore.set("currentUser",action.user)
      return {...state,currentUser: action.user}
    }
  },
  effects: {

    *error(action,{put,call}){
      //yield put(push("/404"))
      message.error("错误")
    },

    *signOut(action,{put,call}){
      yield put({type: "setCurrentUser",user: null})
      yield put({type: "setAccessToken",token: null })
    },

    *signIn({user},{put,call}){
      yield put({type: "setCurrentUser",user: user})
    },

    *validateLogin({login,password},{put,call}){
      let error = new SubmissionError({_error: "登录失败",login: "请检查是否正确",password: "请检查是否正确"})
      let result = yield User.login(login,password).then( (data)=>{
        return data;
      },(data)=>{
        throw error
      }).catch( e =>{
        throw error
      })
      //yield put({type: "signIn",user: action.user})
      if(result.status == "error") {
        //notification.error({message: "错误",description: "登录失败"})
        throw error
      } else {
        yield put({type: "setAccessToken",token: result})
        yield put({type: "initCurrentUser"})
      }
    },

    *setAccessToken({token},{put,call}){
      localStore.set("accessToken",token)
    },

    *initCurrentUser(action,{put,call}){
      let user;
      if(action.local){
        user = localStore.get("currentUser")
        if(user){
          yield put({type: "setCurrentUser",user })
        } else {
          // 重新从服务器刷新
          yield put({type: "initCurrentUser",local: false})
        }
      } else {

        user = yield User.info().catch( (e)=>{
          return {status: "error",data: e}
        } )
        console.log("init current user",user)
        if(user.status == "error"){
          // 登录凭证已经失效
          let result = yield put({type: "refreshAccessToken"})
          if(!result.error){

          }
        } else {
          // 成功登录
          yield put({type: "setCurrentUser",user: user})
        }

      }
    },



    *refreshAccessToken(action,{call,put}){
      let token = localStore.get("accessToken");
      if(!token) {
        console.log("access token not found from local store")
        yield put({type: "signOut"})
        return;
      }
      message.info("正在尝试重新登录....")
      let refresh_token = token.refresh_token
      let params = {}
      params.form = {
        grant_type: "refresh_token",
        refresh_token
      }
      let result = yield httpClient.post("/oauth/token",params)
        .then( response =>{
          if(response.ok){
            let data = response.jsonData;
            message.success("登录成功.")
            return data;
          } else {
            message.error("登录失败.")
            return {status: 'error',message: "未成功"}
          }
        }, response =>{
          return {status: "error",response}
        } )
        .catch( response =>{
          return {status: "error",response}
        } )
      console.log("result",result)
      if(result.status == "error"){
        yield put({type: "signOut"})
      } else {
        // 重新设置accessToken
        yield put({type: "setAccessToken",token: result})
        // 重新init user
        yield put({type: "initCurrentUser"}) // 在服务不好的情况下会导致死循环
      }
      return result
    }

  },
  subscriptions: {
    setup({dispatch,history}){

      // 定时刷新accessToken
      setInterval(
        ()=> dispatch({type: "initCurrentUser"}),
        4 * 60 * 1000
      )

      // 初始化用户
      // 先从local storage里获取用户，因为程序初始化的时候需要
      dispatch({type: "initCurrentUser",local: true})
      // 5s内通过网络刷新
      setTimeout(()=> dispatch({type: "initCurrentUser"}),5000)
      // 检查在线状态
      //if(window.navigator.onLine){
      //}
      // 不需要在componentWillMount 中调用
      history.listen( (location) =>{
        /*
        let urlMatcher = new UrlMatcher({dispatch,location})
        urlMatcher
          .addResource(Group)
          .addResource(Blog)
          .addResource(Tweet)
          .addResource(Message)
          .addResource(Notification)
          .addResource(GroupTopic,{prefix: "/groups/:group_id",path: "topics",action: "group_topics"})
          .addRule({pattern: "/password/edit" ,action: "users/setResetPasswordToken"})
        urlMatcher.run()
        */
      } )
    }
  },
};
