/*
 * 此页面用来解锁账户
*/
import React from "react"
import { connect } from "dva"
import { Row,Col,Card,Form,Button } from "antd"
import { TextField } from "redux-form-antd"
import { reduxForm ,SubmissionError} from "redux-form"
import { Page,Content } from "../components/Layout"
import Field from "../components/Field"

@reduxForm(
  {
    form: 'unlockUser',
    validate: (values)=>{
      let errors = {}
      if(!values.login){
        errors.login = "不可以为空"
      }
      return errors;
    }
  }
)
class UnlockUserForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      requestSent: false
    }
  }

  handleSubmit = (values)=>{
    console.log("values",values)
    let { dispatch } = this.props
    return dispatch({type: "users/unlock",login: values.login}).then( response =>{
      this.setState({requestSent: true})
    } ).catch( (e)=>{
      let json = e.jsonData || {}
      let message = ""
      switch(json.error){
        case "ResourceNotFound":
          message = "用户不存在"
          break
        default:
          message = "未知错误"
      }
      let error = new SubmissionError({login: message})
      throw error
    } )
  }

  goBack = (event)=>{
    this.setState({requestSent: false})
  }

  render(){
    let { handleSubmit,submitting,error } = this.props
    let goBack = this.goBack
    if(this.state.requestSent){
      return (
        <div>
          已经向你的注册邮箱发送了邮件，请按照邮件指示进行操作。
          <Button onClick={goBack}>返回</Button>
        </div>
      )
    }
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field component={TextField} name="login" label="登录凭证" placeholder="用户名/邮箱" />
        <Field submit>
          <Button type="primary" onClick={handleSubmit(this.handleSubmit)} disabled={submitting}>提交</Button>
          {error}
        </Field>
      </Form>
    )
  }
}


@connect( (state)=>{
  return {
    currentUser: state.global.currentUser
  }
})
export default class UnlockUserPage extends React.Component {
  render(){
    return (
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Card title="用户解锁">
                <UnlockUserForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}
