import Notification from "../resources/Notification"
import _ from "lodash"

export default {
  namespace: 'notifications',
  state: {
    notifications: [],
    notification: null
  },
  reducers: {
    setState(state,action){
      return {...state,...action.state}
    }
  },
  effects: {
    *destroy(id){
      let result = yield Notification.destroy(id)
    },
    *index(action,{put,select}){
      let notifications = yield Notification.findAll().catch(e => [])
      yield Notification.readAll()
      let user = yield select( state => state.global.currentUser )
      user = {...user,"notifications_count": 0}
      yield put({type: "global/setCurrentUser",user})
      yield put({type: "setState",state: { notifications }})
    },
    *show(action,{put}){
      let { id } = action
      let notification = yield Notification.find(id).catch( e => {} )
      yield put({type: "setState",state: { notification }})
    },
    *destroy({notification},{put,select}){
      let notifications = yield select( state => state.notifications.notifications )
      notifications = _.clone(notifications)
      yield Notification.destroy(notification.id).catch( e => console.log(e) )
      let index = notifications.indexOf(notification)
      if(index >= 0){
        notifications.splice(index,1)
        yield put({type: "setState",state: {notifications}})
      }
    }
  },
  subscriptions: {},
};
