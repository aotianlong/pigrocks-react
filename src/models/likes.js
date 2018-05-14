import Like from "../resources/Like"

export default {

  namespace: 'likes',

  state: {
    pagination: {},
    likes: []
  },

  effects: {
    *index({page},{put,select}){
      console.log("likes/index")
      let { data: likes,pagination } = yield Like.findAll({},{more: true})
      yield put({type: "setState",state: {likes,pagination}})
    }
  },

  reducers: {
    setState(state,{state: new_state}){
      return {...state,...new_state}
    }
  }

};
