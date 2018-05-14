import Blog from "../resources/Blog"

export default {
  namespace: 'blogs',
  state: {
    blogs: [],
    blog: {},
    form: {}
  },
  reducers: {
    setState(state,action){
      return {...state,...action.state}
    }
  },
  effects: {
    *destroy(id){
      let result = yield Blog.destroy(id)
    },
    *save(values,{put}){
      if(values.id){
        yield put({type: "update",...values})
      } else {
        yield put({type: "create",...values})
      }
    },
    *create(values){
      let result = yield Blog.new(values).save().catch(e => e)
    },
    *update(values){
      let result = yield Blog.new(values).save().catch( e => e )
    },
    *index(){
      console.log("index")
    }
  },
  subscriptions: {},
};
