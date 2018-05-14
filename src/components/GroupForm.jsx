import React from "react"
import { connect } from "dva"
import { reduxForm } from "redux-form"
import { Form,Input,Button,message } from "antd"
import { TextField,TextAreaField } from "redux-form-antd"
import { push } from "react-router-redux"
import Field from "../components/Field"

let form = (props)=>{
  const { handleSubmit,submitting,dispatch } = props

  let submit = (values)=>{
    return dispatch({type: "groups/create",values}).then( response =>{
      console.log("ok",response)
      // 重新定向到新group
      let group = response
      message.success("成功创建群组")
      dispatch(push(`/groups/${group.id}`))
    },response =>{
      message.error(JSON.stringify(response))
      console.log("error",response)
    })
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Field name="name" component={TextField} label="名称" />
      <Field name="tag_list" component={TextField} label="标签" />
      <Field name="description" component={TextAreaField} label="介绍" />
      <Field submit>
        <Button type="primary" onClick={handleSubmit(submit)} disabled={submitting}>提交</Button>
      </Field>
    </Form>
  )
}

form = reduxForm(
  {
    form: "group",
    enableReinitialize: true,
    validate: (values)=>{
      let errors = {}
      if(!values.name){
        errors.name = "不可以为空"
      }
      if(!values.description){
        errors.description = "不可以为空"
      }
      return errors;
    }
  }
)(form)

form = connect(
  (state)=>{
    return {
      group: state.groups.form,
      initialValues: state.groups.form
    }
  }
)(form)

export default form
