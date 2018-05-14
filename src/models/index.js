import User from "../resources/User"
import GroupTopic from "../resources/GroupTopic"
import Group from "../resources/Group"

export default {
  namespace: 'index',
  state: {
    articles: [],
    users: [],
    groups: [],
    stats: {}, // 统计
    topics: [] // 热门帖子
  },
  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  },
  effects: {
    *index(action,{call,put}){
      // 获取最新用户
      let users = yield User.findAll()
      // 热门帖子
      let topics = yield GroupTopic.findAll()
      let groups = yield Group.findAll()
      yield put({type: "setState",state: {users,topics,groups}})
    }
  },
  subscriptions: {},
};
