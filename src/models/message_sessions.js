import MessageSession from "../resources/MessageSession"
import User from "../resources/User"

export default {
  namespace: 'message_sessions',
  state: {
    message_sessions: [],
    messages: [],
    user: null,
    pagination: null
  },
  reducers: {

    setState(state,action){
      return {...state,...action.state}
    }

  },
  effects: {
    *index({params},{put}){
      let { user: username } = params
      let user = yield User.findByUsername(username)
      let { data: message_sessions,pagination } = yield MessageSession.findAllMessages({ user: username },{ more: true }).catch( e => console.log(e) )
      yield put({type: "setState",state: { message_sessions,user,pagination }})
    },
    *show({params},{put}){

      let { user: username } = params
      let user = yield User.findByUsername(username)
      let { data: messages,pagination } = yield MessageSession.findAllMessages({ user: username },{ more: true }).catch( e => console.log(e) )
      yield put({type: "setState",state: { messages,user,pagination }})

    },
    *read({params},{put,select}) {
      let user = yield select( state => state.global.currentUser )
      let { user: username } = params
      let result = yield MessageSession.read({user: username})
      let { count } = result
      let newUser = {...user,"messages_count": count}
      console.log("new user",newUser,"count",count,"result",result)
      yield put({type: "global/setCurrentUser",user: newUser})
    }
  },
  subscriptions: {},
};
