import React,{ Component } from "react"
import { reduxForm ,SubmissionError} from "redux-form"
import { TextField,PasswordField } from "redux-form-antd"
import { Form,Input,Button } from "antd"
import { connect } from "react-redux"

import Field,{SubmitItem} from "../components/Field"

class form extends React.Component {


  findPassword = (values)=>{
    let { dispatch } = this.props
    return dispatch({type: "users/findPassword",user: values})
  }



  render() {
    const { handleSubmit,submitting,error,success,dispatch } = this.props

    if(success){
      return <div>一封重置密码的邮件已经发送到您的注册邮箱，请注意查收。<Button onClick={(event)=>this.props.dispatch({type: "users/resetFindPassword"})}>我知道了</Button></div>
    }
    return(
      <Form onSubmit={handleSubmit(this.findPassword)}>
        <Field name="login" label="登录凭证" component={TextField} placeholder="用户名/邮箱地址"/>
        <SubmitItem>
          <Button type="primary" onClick={handleSubmit(this.findPassword)} disabled={submitting}>提交</Button>
        </SubmitItem>
      </Form>
    )
  }
}


form = reduxForm({
  form: 'newPassword',
  validate: (values)=>{
    let errors = {}
    if(!values.login){
      errors.login = "不可以为空"
    }
    return errors;
  }
})(form)


form = connect(
  (state)=>{
    return {
      success: state.users.findPasswordSuccess
    }
  }
)(form)


export default form;
