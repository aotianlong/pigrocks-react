import GroupTopic from "../resources/GroupTopic"
import GroupPost from "../resources/GroupPost"
import Group from "../resources/Group"
import { push } from "react-router-redux"

import Recommendation from "../resources/Recommendation"
import Like from "../resources/Like"

export default {
  namespace: 'group_topics',
  state: {
    form: {},
    topics: [],
    group: {},
    posts: [],
    topic: null,
    topicLoading: false,
    topicsLoading: false,
    pagination: {},
    selectedPostID: null,
    recommendations: [],
    likes: [],
    activeTab: "replies"
  },
  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  },
  effects: {

    *edit(action,{put,call}){
      let id = action.id
      try{
        let topic = yield call(GroupTopic.find.bind(GroupTopic),id)
        console.log("edit topic",topic)
        yield put({type: "setState",state: {form: topic}})
      } catch(e) {
        console.log(e)
      }
    },

    *recommends(action,{put}){

      let groupId = action.group_id
      let topicId = action.id
      let page = action.page || 1
      let topic = yield GroupTopic.find(topicId)
      let group = yield Group.find(groupId)
      let { data: recommendations,pagination } = yield Recommendation.findAll({q: {recommendable_id_eq: topic.id,recommendable_type_eq: "GroupTopic"}},{more: true})
      // 获取回复列表
      yield put({
        type: "setState",
        state:{
          group: group,
          topic: topic,
          activeTab: "recommends",
          recommendations
        }
      })
      return "test"
    },

    *likes(action,{put}){

      let groupId = action.group_id
      let topicId = action.id
      let page = action.page || 1
      let topic = yield GroupTopic.find(topicId)
      let group = yield Group.find(groupId)
      //console.log("parsed result",posts,pagination)
      let { data: likes,pagination } = yield Like.findAll({q: {likable_id_eq: topic.id,likable_type_eq: "GroupTopic"}},{more: true})
      yield put({
        type: "setState",
        state:{
          group: group,
          topic: topic,
          activeTab: "likes",
          likes
        }
      })



    },

    *new(action,{put}){
      let group_id = action.group_id
      let group = yield Group.find(group_id).catch( response => {} )
      yield put({type: "setState",state: {form: {group_id},group: group}})
    },
    *save(action,{put,call}){
      console.log("save",action)
      let groupTopic = new GroupTopic(action.group_topic)
      try{
        let save = call(groupTopic.save.bind(groupTopic))
        console.log("save",save)
        let topic = yield save
        console.log("topic",topic)
        yield put(push(`/groups/${topic['group_id']}/topics/${topic.id}`))
      } catch(e) {
        console.log("error",e)
      }
    },
    *destroy(action){
    },

    *show(action,{put,call}){
      console.log(action)
      let groupId = action.group_id
      let topicId = action.id
      try{
        let page = action.page || 1
        let topic = yield GroupTopic.find(topicId)
        let group = yield Group.find(groupId)
        // 获取回复列表
        let result = yield GroupPost.findAll({q:{topic_id_eq: topic.id},page: page},{more: true})
        let { data: posts,pagination  } = result
        //console.log("parsed result",posts,pagination)
        yield put({
          type: "setState",
          state:{
            group: group,
            topic: topic,
            posts: posts,
            pagination,
            selectedPostID: action.post_id,
            activeTab: "replies"
          }
        })
        return topic
      } catch(e){
        //console.log(e)
        //yield put({type: "global/error",error: e})
        throw e
      }
    },

    *index(action,{put}){
      let groupId = action.group_id
      let topics = yield GroupTopic.findAll().catch( (e)=>{
        throw e
      } )
      yield put({type: "setState",state:{ topics: topics }})
    }
  },
  subscriptions: {},
};
