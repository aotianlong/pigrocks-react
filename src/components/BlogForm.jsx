import React from "react"
import { connect } from "dva"
import { reduxForm,Field } from "redux-form"
import { message,Form,Input,Button } from "antd"
import { TextField } from "redux-form-antd"
import Attachable from "./Attachable"
import { push } from "react-router-redux"


let form = (props)=>{

  const { handleSubmit,submitting,dispatch } = props
  let saveBlog = (values)=>{
    dispatch({type: "blogs/save",blog: values})
  }

  return (
    <Form onSubmit={handleSubmit(saveBlog)}>
      <Form.Item label="标题">
        <Field name="title" component={TextField} placeholder="标题"/>
      </Form.Item>
      <Form.Item label="内容">
        <Field name="content" component={TextField} type="textarea" placeholder="内容"/>
      </Form.Item>
      <Form.Item label="图片">
        <Field name="attachment_ids" component={Attachable} />
      </Form.Item>
      <Form.Item>
        <br />
        <Button type="primary" onClick={handleSubmit(saveBlog)} disabled={submitting}>提交</Button>
      </Form.Item>
    </Form>
  )
}

form = reduxForm(
  {form: "blog"}
)(form)

form = connect(
  (state)=>{
    return {
      blog: state.blogs.form,
      initialValues: state.blogs.form
    }
  }
)(form)

export default form
