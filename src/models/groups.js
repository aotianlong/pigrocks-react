import Group from "../resources/Group"
import GroupTopic from "../resources/GroupTopic"
import GroupMember from "../resources/GroupMember"

export default {
  namespace: 'groups',
  state: {
    groups: [],
    topics: [],
    indexTopics: [],
    users: [],
    group: {},
    members: [],
    pagination: {},
    groupMembers: [],
    recommendedGroups: [],
    joinedGroups: [],
    // browse
    browseGroups: [],
    browsePagination: {},
    // filter
    filterForm: {}
  },
  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  },
  effects: {
    *create({values},{put}){
      let group = new Group(values)
      return group.save()
    },
    *update({values},{put}){
      let group = new Group(values)
      return group.save()
    },
    *destroy({id},{put,call}){
      let result = yield Group.destroy(id)
      console.log("destroy",result)
    },
    *show({id,page},{put,call}){
      let group = yield Group.find(id)
      let {data: topics,pagination} = yield GroupTopic.findAll({page: page,q: {group_id_eq: id}},{more: true}).catch(e => {
        return {data: [],pagination: {},error: true,response: e}
      })
      // group members
      let groupMembers = yield GroupMember.findAll({
        q: {s: "id desc",group_id_eq: id,normal: true}
      }).catch( e => [] )
      yield put({type: "setState",state:{group: group,topics: topics,pagination,groupMembers}})
    },
    *edit(){
    },
    *browse({page,q},{call,put,select}){
      console.log("browse groups")
      let currentUser = yield select(state => state.global.currentUser)
      let {data: groups,pagination: browsePagination} = yield Group.findAll({page,q},{more: true}).catch( e => console.log("index error",e) )
      yield put({type: "setState",state: {
        browseGroups: groups,
        browsePagination
      }})
    },
    *index({page},{call,put,select}){
      let currentUser = yield select(state => state.global.currentUser)
      let groups = yield Group.findAll().catch( e => console.log("index error",e) )
      // 获得推荐群组
      let recommendedGroups = yield Group.findAll().catch( e => console.log("index error",e) )
      let groupMembers = yield GroupMember.findAll({
        q: {
          user_id_eq: currentUser && currentUser.id,
          member: true
        }
      })
      let groupMemberIds = groupMembers.map( m => m['group_id'] )
      let joinedGroups = yield Group.findAll({q: {id_in: groupMemberIds}})
      if(currentUser){
        let { data: topics,pagination } = yield GroupTopic.findAll({ page },{more:true}).catch( e => console.log("error",e) )
        yield put({
          type: "setState",
          state:{
            groups,
            pagination,
            indexTopics: topics,
            recommendedGroups,
            joinedGroups
          }})
      }
    }
  },
  subscriptions: {},
};
