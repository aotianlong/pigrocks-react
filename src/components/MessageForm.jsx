import React from "react"
import { connect } from "react-redux"
import { reduxForm,Field } from "redux-form"
import { Form,Input,Button } from "antd"
import { TextAreaField,TextField } from "redux-form-antd"
import { push } from "react-router-redux"
import { SubmissionError } from 'redux-form';
import { parseError } from "../lib/service"
// import actions

let form = (props)=>{
  const { handleSubmit,submitting,dispatch,error } = props

  let save = (values)=>{
    //throw new SubmissionError({body: "x"})
    return new Promise(( resolve,reject )=>{

      let result = dispatch({type: "messages/create",message: values}).catch(e =>{
        //console.log("xxxxx")
      })
      result.then( (response)=>{
        if(response.error){
          let error = parseError(response)
          console.log("error",error)
          if(error.receiver_id){
            error.receiver_name = error.receiver_id
          }
          reject(new SubmissionError(error))
        } else {
          dispatch(push("/messages"))
          resolve(response)
        }
      } )

    })
    // 对方有三种设置:
    // 1. 接受任何人的站内信
    // 2. 只接受联系人的站内信
    // 3. 不接受任何人额站内信
    // 4. 黑名单中的任何人都不会接受
  }

  return (
    <Form onSubmit={handleSubmit(save)}>
      <Form.Item label="接收人">
        <Field name="receiver_name" component={TextField} />
      </Form.Item>
      <Form.Item label="内容">
        <Field name="body" component={TextAreaField} />
      </Form.Item>
      <Form.Item>
        {error && <div><strong>{error}</strong></div>}
        <Button type="primary" onClick={handleSubmit(save)} disabled={submitting}>提交</Button>
      </Form.Item>
    </Form>
  )
}

form = reduxForm(
  {
    form: "message",
    enableReinitialize: true,
    validate: (values)=>{
      let errors = {}
      if(!values.receiver_name){
        errors.receiver_name = "不可以为空"
      }
      if(!values.body){
        errors.body = "不可以为空"
      }
      return errors;
    }
  }
)(form)

form = connect(
  (state)=>{
    return {
      message: state.messages.form,
      initialValues: state.messages.form
    }
  }
)(form)

export default form
