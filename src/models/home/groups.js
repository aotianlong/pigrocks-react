import Group from "../../resources/Group"

export default {
  namespace: 'home_groups',
  state: {
    groups: [],
    pagination: {}
  },
  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  },
  effects: {
    *index({page},{call,put,select}){
      let { data: groups,pagination } = yield Group.findMyAll({ page },{ more: true }).catch( e => console.log("index error",e) )
      yield put({type: "setState",state:{ groups,pagination }})
    }
  },
  subscriptions: {},
};
