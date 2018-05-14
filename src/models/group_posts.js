import { push  } from "react-router-redux"
import GroupPost from "../resources/GroupPost"

export default {
  namespace: 'group_posts',
  state: {
    form: {}
  },
  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  },
  effects: {
    *edit(action,{put,call}){
      let { id,group_id,topic_id } = action
      let post = yield GroupPost.find(id)
      yield put({type: "setState",state: {form: post}})
    },

    *new({topic_id,group_id},{put}){
      let post = {topic_id,group_id}
      yield put({type: "setState",state: {form: post }})
    },
    *save(action,{put,call}){
      let groupPost = new GroupPost(action.group_post)
      try{
        let post = yield groupPost.save.bind(groupPost)().catch( e => {
          //console.log(e)
          //if(e.error == "AccessDenied"){
          //}
          return e;
        })
        console.log("post",post)
        if(post.error){
          return post
        }
        let page = post['at-page']
        //yield put(push(`/groups/${post['group_id']}/topics/${post['topic_id']}?page=${page}&post_id=${post.id}`))
        yield put(push(`/groups/${post['group_id']}/topics/${post['topic_id']}/posts/${post.id}`))
      } catch(e) {
        console.log("error",e)
      }
    },
    *destroy(action){
    },

    *show(action,{put,call}){
      let id = action.id
      let groupPost = yield GroupPost.find(id)
      console.log("groupPost",groupPost)
      let page = groupPost['at-page']
      yield put(push(`/groups/${groupPost['group_id']}/topics/${groupPost['topic_id']}?page=${page}&post_id=${groupPost.id}`))
    },

    *index(action,{put}){
    }

  },
  subscriptions: {},
};
