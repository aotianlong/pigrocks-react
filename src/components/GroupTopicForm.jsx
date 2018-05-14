import React from "react"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { Form,Input,Button } from "antd"
import { TextField,HiddenField,TextAreaField } from "redux-form-antd"
import { push } from "react-router-redux"
import _ from "lodash"
// import actions
import AttachableField from "./AttachableField"
import Field from "../components/Field"


let form = (props)=>{
  const { handleSubmit,submitting,group_topic,dispatch,group } = props

  let save = (values)=>{
    //values.group_id = group && group.id
    values = _.pick(values,"subject","body","group_id","attachment_ids","id")
    dispatch({type: "group_topics/save",group_topic: values})
  }

  let { post } = group_topic
  let attachments = []
  if(post){
    attachments = post.attachments
  }

  return (
    <Form onSubmit={handleSubmit(save)}>
      <Field name="group_id" component="input" type="hidden" />
      <Field name="subject" label="标题" component={TextField} />
      <Field name="body" label="内容" component={TextAreaField} type="textarea" rows={4}/>
      <Field name="attachment_ids" label="图片" klass="GroupAttachment" attachable={group_topic} component={AttachableField} attachments={attachments}/>
      <Field submit>
        <Button type="primary" onClick={handleSubmit(save)} disabled={submitting}>提交</Button>
      </Field>
    </Form>
  )
}

form = reduxForm(
  {
    form: "group_topic",
    enableReinitialize: true,
    validate: (values)=>{
      let errors = {}
      if(!values.subject){
        errors.subject = "不可以为空"
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
      group_topic: state.group_topics.form,
      initialValues: state.group_topics.form
    }
  }
)(form)

export default form
