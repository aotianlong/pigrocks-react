import React,{ Component } from "react"
import { reduxForm } from "redux-form"
import { TextField,PasswordField } from "redux-form-antd"
import { Form,Input,Button } from "antd"
import { connect } from "react-redux"
import Field,{SubmitItem} from "../components/Field"
import { SubmissionError } from "redux-form"

let validate = values => {
  let errors = {}
  if(!values.login)
    errors.login = "请输入登录凭证"
  if(!values.password)
    errors.password = "请输入密码"
  if(values.password != values.password_confirmation)
    errors.password_confirmation = "输入密码不匹配"
  if(!values.password_confirmation)
    errors.password_confirmation = "请输入密码"
  if(values.password && values.password.length < 8)
    errors.password = "密码需要大于7位"
  if(!values.email)
    errors.email = "请输入邮箱地址"
  if(values.email && !values.email.match(/[\w\.\_\-]+@[\w\-\_]+(\.\w+){1,5}/))
    errors.email = "请输入正确的邮箱地址"
  return errors;
}
@reduxForm({
  form: 'registerForm',
  validate,
})
@connect(
  (state)=>{
    return {
      registeredUser: state.users.registeredUser
    }
  }
)
export default class RegisterForm extends React.Component {


  registerUser = (values)=>{
    let { dispatch } = this.props
    return dispatch({type: "users/create",user: values}).then(
      response =>{
        console.log("ok",response)
      },
      response =>{
        console.log("error",response)
        throw response
      }
    )
  }


  render() {
    const { registeredUser,handleSubmit,submitting,dispatch,error } = this.props


    let registerUser = this.registerUser;

    let notice = null
    if(registeredUser){
      notice = <div>{registeredUser.username},您已经成功注册。一封验证邮件已经发送到您的注册邮箱，请注意查收。</div>
    } else {

    }
    if(notice){
      return notice;
    }
    return(
      <Form onSubmit={handleSubmit(registerUser)}>
        <Field name="login" label="用户名" component={TextField} placeholder="用户名"/>
        <Field name="email" label="电子邮箱" component={TextField} placeholder="Email: example@example.com"/>
        <Field name="password" label="密码" type="password" component={TextField} placeholder="密码" />
        <Field name="password_confirmation" label="重复密码" type="password" component={TextField} placeholder="重复密码" />
        <SubmitItem>
          <Button type="primary" onClick={handleSubmit(registerUser)} disabled={submitting}>注册</Button>
          {' '}{error && <span className="error">{error}</span>}
        </SubmitItem>
      </Form>
    )
  }
}
