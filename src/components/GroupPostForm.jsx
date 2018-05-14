import React from "react"
import { connect } from "react-redux"
import { Field as Field2,reduxForm,SubmissionError } from "redux-form"
import { Mention,Form,Input,Button } from "antd"
import { TextField,TextAreaField } from "redux-form-antd"
import { push } from "react-router-redux"
import Field from "../components/Field"

// import actions
import AttachableField from "./AttachableField"



class form extends React.Component {

  showAttachment = (event)=>{
    event.preventDefault()
    this.setState({showAttachment: true})
  }

  constructor(props){
    super(props)
    this.state = {
      showAttachment: false
    }
  }

  componentWillReceiveProps(nextProps){
    let { post } = nextProps
    let { dispatch } = this.props
    if(post){
      dispatch({type: "group_posts/setState",state:{ form: post }})
    }
  }



  save = (values)=>{
    /*
    values = {
      ...values,
      topic_id: group_post['topic_id']
    }
    */
    let { dispatch } = this.props
    let result = dispatch({type: "group_posts/save",group_post: values})
    return result.then( response =>{
      console.log("response",response)
      if(response.error == "AccessDenied"){
        throw new SubmissionError({_error: "没有权限"})
      }
    },response =>{
    })//.catch( e => console.log(e) )
  }


  render() {
    let { error,handleSubmit,submitting,group_post,dispatch,topic,mode } = this.props
    mode = mode || "simple"


    let { showAttachment } = this.state
    let save = this.save

    return (
      <Form onSubmit={handleSubmit(save)}>
        <Field2 name="topic_id" component="input" type="hidden"/>
        <Field name="body" label="内容" component={TextAreaField} placeholder="请输入内容" />
        {showAttachment && <Field name="attachment_ids" label="图片" component={AttachableField} attachable={group_post} klass="GroupAttachment" />}
        {!showAttachment &&
        <Field submit>
          <a href="#" onClick={this.showAttachment}>添加图片</a>
        </Field>
        }
        <Field submit>
          {false && <Mention suggestions={["aaaa","bbb"]} multiLines style={{height: "100px"}}/> }
          <Button type="primary" onClick={handleSubmit(save)} disabled={submitting}>提交</Button>
          {' '}
          {error}
          <div>
            <a href="https://markdown-zh.readthedocs.io/en/latest/" target="_blank">
              支持Markdown语法
            </a>
          </div>
        </Field>
      </Form>
    )

  }
}

form = reduxForm(
  {
    form: "group_post",
    enableReinitialize: true,
    validate: (values)=>{
      let errors = {}
      if(!values.title){
        errors.title = "不可以为空"
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
      group_post: state.group_posts.form,
      initialValues: state.group_posts.form
    }
  }
)(form)

export default form
