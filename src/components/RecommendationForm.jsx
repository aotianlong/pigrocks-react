import React from "react"
import { connect } from "react-redux"
import { reduxForm,Field } from "redux-form"
import { Form,Input,Button } from "antd"
import { TextField } from "redux-form-antd"
import { push } from "react-router-redux"


let form = (props)=>{
  const { handleSubmit,submitting,dispatch } = props

  let save = (values)=>{
    dispatch({type: "recommendations/save",recommendation: values})
  }

  return (
    <Form onSubmit={handleSubmit(save)}>
      <Form.Item label="Title">
        <Field name="title" component={TextField} />
      </Form.Item>
      <Form.Item>
        <br />
        <Button type="primary" onClick={handleSubmit(save)} disabled={submitting}>提交</Button>
      </Form.Item>
    </Form>
  )
}

form = reduxForm(
  {
    form: "recommendation",
    enableReinitialize: true,
    validate: (values)=>{
      let errors = {}
      if(!values.title){
        errors.title = "不可以为空"
      }
      return errors;
    }
  }
)(form)

form = connect(
  (state)=>{
    return {
      recommendation: state.RecommendationForm.recommendation,
      initialValues: state.RecommendationForm.recommendation
    }
  }
)(form)

export default form
