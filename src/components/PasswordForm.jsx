import React,{ Component } from "react"
import { reduxForm } from "redux-form"
import { TextField,PasswordField } from "redux-form-antd"
import { Form,Input,Button } from "antd"
import { connect } from "react-redux"
import Field from "../components/Field"


class PasswordForm extends React.Component {


  updatePassword = (values)=>{
    let { dispatch } = this.props
    return dispatch({type: "users/updatePassword",user: values})
  }


  render() {
    const { error,handleSubmit,submitting,submitSucceeded,submitFailed } = this.props

    let updatePassword = this.updatePassword

    console.log(this.props)

    if(submitSucceeded){
      return <div>您已经成功修改密码。</div>
    }

    if(submitFailed){
      //return <div>失败</div>
    }

    return(
      <Form onSubmit={handleSubmit(updatePassword)}>
        <Field name="reset_password_token" type="hidden" component="input" />
        <Field label="密码" name="password" type="password" component={TextField} placeholder="密码" />
        <Field label="重复密码" name="password_confirmation" type="password" component={TextField} placeholder="重复密码" />
        <Field submit>
          <Button type="primary" onClick={handleSubmit(updatePassword)} disabled={submitting}>更改密码</Button>
          {' '}{error}
        </Field>
      </Form>
    )
  }
}

let validate = values => {
  let errors = {}
  if(!values.password)
    errors.password = "请输入密码"
  if(values.password != values.password_confirmation)
    errors.password_confirmation = "输入密码不匹配"
  if(!values.password_confirmation)
    errors.password_confirmation = "请输入密码"
  if(values.password && values.password.length < 8)
    errors.password = "密码需要大于7位"
  return errors;
}

// Decorate with redux-form 
PasswordForm = reduxForm({
  form: 'passwordForm',
  validate,
  enableReinitialize: true
})(PasswordForm)

PasswordForm = connect(
  (state)=>{
    return {
      initialValues: {
        reset_password_token: state.users.resetPasswordToken
      }
    }
  }
)(PasswordForm)
 
export default PasswordForm
