import Profile from "../resources/Profile"

export default {
  namespace: 'profiles',
  state: {
    form: {}
  },
  reducers: {
    setState(state,action){
      return {...state,...action.state}
    }
  },
  effects: {
    *edit({userId},{put,select}){
      // 获取
      let profile = yield Profile.find(userId)
      yield put({type: "setState",state: { form: profile }})
    }
  },
  subscriptions: {},
};
