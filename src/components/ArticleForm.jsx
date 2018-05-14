import React from "react"
import { connect } from "react-redux"
import { reduxForm,Field } from "redux-form"
import { Form,Input,Button } from "antd"
import { TextField } from "redux-form-antd"
import Attachable from "./Attachable"
import { push } from "react-router-redux"


let form = (props)=>{
  const { handleSubmit,submitting,article,dispatch } = props
  let save = (values)=>{
    dispatch({type: "articles/save",article: values})
  }
  return (
    <Form onSubmit={handleSubmit(save)}>
      <Form.Item label="标题">
        <Field name="title" component={TextField} />
      </Form.Item>
      <Form.Item label="内容">
        <Field name="body" component={TextField} type="textarea" />
      </Form.Item>
      <Form.Item label="图片">
        <Field name="attachment_ids" component={Attachable} attachable={article} klass="ArticleAttachment" value={article && article.attachment_ids}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit(save)} disabled={submitting}>提交</Button>
      </Form.Item>
    </Form>
  )
}

form = reduxForm(
  {
    form: "article",
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
      article: state.ArticleForm.article,
      initialValues: state.ArticleForm.article
    }
  }
)(form)

export default form
