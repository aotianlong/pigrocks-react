import User from "../resources/User"
import Like from "../resources/Like"
import Friendship from "../resources/Friendship"
import Profile from "../resources/Profile"
import Group from "../resources/Group"

import { SubmissionError } from "redux-form"
import { parseError } from "../lib/service"

export default {
  namespace: 'users',
  state: {
    users: [],
    user: {},
    form: {},
    likes: [],
    friends: [],
    registeredUser: null,
    profile: {},
    groups: [],
    friendsPagination: {},
    likesPagination: {},
    groupsPagination: {}
  },
  reducers: {
    setState(state,action){
      return {...state,...action.state}
    }
  },
  effects: {
    *index(action,{put,call}){
      let result = yield User.findAll().catch( e => e )
      yield put({type: "setState",state: {users: result}})
    },
    *show({username: id},{put,call}){
      let user = yield User.find(id).catch(e => e)
      let profile = yield Profile.find(user.id).catch(e => e)
      yield put({type: "setState",state: {user,profile}})
    },
    *groups({username},{put}){
      let user = yield User.find(username).catch(e => e)
      let {data: groups,pagination} = yield Group.findAll({q: {user_id_eq: user.id}},{more: true})
      yield put({type: "setState",state: {groups,groupsPagination: pagination,user}})
    },
    *friends({username,page},{put}){
      let user = yield User.find(username).catch(e => e)
      let { data: friends,pagination } = yield Friendship.findAll({q: {user_id_eq: user.id}},{more: true})
      let state = {friendsPagination: pagination,friends,user}
      yield put({type: "setState",state})
    },
    *likes({username,page},{put}){
      let user = yield User.find(username).catch(e => e)
      let { data: likes,pagination } = yield Like.findAll({q: {user_id_eq: user.id}},{more: true})
      let state = {likesPagination: pagination,likes,user}
      yield put({type: "setState",state})
    },
    *create(action,{put,call}){
      let result = yield new User(action.user).save().catch( e => e )
      console.log("result",result)
      if(result.error){
        let err = parseError(result)
        err.login = err.username
        err._error = "注册失败"
        console.log("err",err,"result",result)
        let error = new SubmissionError(err)
        throw(error)
      } else {
        yield put({type: "setState",state:{ registeredUser: result }})
      }
    },
    *findPassword(params,{put,call}){
      let result = yield User.findPassword(params).catch(e => e)
      if(result.error){
        // 没有找到用户
        let error = new SubmissionError({login: result.message})
        throw(error)
      } else {
        yield put({type: "setState",state: {findPasswordSuccess: true}})
      }
    },
    *resetFindPassword(params,{put,call}){
      yield put({type: "setState",state: {findPasswordSuccess: false}})
    },
    *updatePassword(params,{put,call}){
      let result = yield User.updatePassword(params).catch( e => e )
      if(result.error){
        let error = new SubmissionError({_error: result.message})
        console.log("error",error)
        throw(error)
      } else {
        console.log("error",result)
      }
    },
    *setResetPasswordToken(params,{put,call}){
      let reset_password_token = params.params.reset_password_token
      yield put({type: "setState",state: {resetPasswordToken: reset_password_token}})
    },
    *unlock({login},{put}){
      let result = yield User.unlock(login)
      return result
    }
  },
  subscriptions: {},
};
