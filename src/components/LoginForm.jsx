import React,{ Component } from "react"
import { reduxForm ,SubmissionError} from "redux-form"
import { TextField,PasswordField } from "redux-form-antd"
import { Form,Input,Button } from "antd"
import { connect } from "dva"
import Field,{formItemLayout,SubmitItem } from "../components/Field"
import Errors from "../components/Errors"

class LoginForm extends React.Component {


  signUser = (values)=>{
    let dispatch = this.props.dispatch
    return dispatch({type: "global/validateLogin",login: values.login,password: values.password})
      .then( response =>{
        console.log("ok",response)
      },response =>{
        console.log("error",response)
        throw response
      } )
  }

  render() {
    const { handleSubmit,submitting,error } = this.props
    return(
      <Form onSubmit={handleSubmit(this.signUser)}>
        <Field name="login" label="登录凭证" component={TextField} placeholder="用户名/邮箱"/>
        <Field name="password" label="密码" component={TextField} type="password" placeholder="密码" />
        <SubmitItem>
          <Button type="primary" onClick={handleSubmit(this.signUser)} disabled={submitting}>登录</Button>
        </SubmitItem>
      </Form>
    )
  }
}




let validate = values => {
  let errors = {}
  if(!values.login)
    errors.login = "请输入登录凭证"
  if(!values.password)
    errors.password = "请输入密码"
  return errors;
}


LoginForm = reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)


LoginForm = connect(
  (state)=>{
    return {
    }
  }
)(LoginForm)


export default LoginForm
