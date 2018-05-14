import GroupMember from "../resources/GroupMember"
import Group from "../resources/Group"

export default {
  namespace: 'group_members',
  state: {
    group: null,
    members: [],
    pagination: {}
  },
  reducers: {
    setState(state,action){
      return {...state,...action.state}
    }
  },
  effects: {
    *index({group_id,status,page},{put,select}){
      let group = yield Group.find(group_id).catch(e => e)
      console.log("status",status)
      if(!status){
        status = "normal"
      }
      let { data: members,pagination } = yield GroupMember.findAll({q: {group_id_eq: group_id,state_name_eq: status}},{more: true})
      yield put({type: "setState",state: {group,members,pagination}})
    }
  },
  subscriptions: {},
};
