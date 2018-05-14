import Message from "../resources/Message"
import MessageSession from "../resources/MessageSession"
import { SubmissionError } from 'redux-form';

export default {
  namespace: 'messages',
  state: {
    messages: [],
    form: {}, // form的默认value
    message: null,
    pagination: {}
  },
  reducers: {

    setState(state,action){
      return {...state,...action.state}
    }

  },
  effects: {
    *index({params},{put}){
      let { data: messages,pagination} = yield MessageSession.findAll({},{more: true}).catch( e => console.log(e) )
      yield put({type: "setState",state: { messages,pagination }})
    },
    *new(action,{put}){
      // 初始化form
      let { params } = action
      console.log("params",params)
      yield put({type: "setState",state: {form: { receiver_name: params.u }}})
    },
    *create(values,{put}){
      let { message: params } = values
      console.log("create",params)
      let { receiver_name,body } = params
      let message = new Message({receiver_name,body})
      let response = yield message.save().catch(e =>{
        return e;
      })
      return response
    }
  },
  subscriptions: {},
};
