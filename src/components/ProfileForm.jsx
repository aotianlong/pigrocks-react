import React from "react"
import { reduxForm } from "redux-form"
import { TextField,TextAreaField,DatePickerField } from "redux-form-antd"
import { connect } from "dva"
import { Cascader,Form,Button,Col,Spin,notification } from "antd"

import { Avatar } from "../components/User"
import httpClient from "../lib/http_client"
import LocationField from "../components/LocationField"

import Field,{formItemLayout} from "../components/Field"

class form extends React.Component {

  constructor(props){
    super(props)
    this.state = {submitting: false}
  }

  save = (values)=>{
    console.log(values)
    let { currentUser: user } = this.props
    let userID = user.id
    this.setState({submitting: true})
    console.log("values",values)
    httpClient.put("profiles/" + userID,{json: values}).then( (response)=>{
      notification.success({message: "成功",description: "修改成功."})
      this.setState({submitting: false})
    },(response)=>{
      this.setState({submitting: false})
    } )
  }

  loadData = ()=>{
    alert("load data")
    console.log("load data")
  }

  render(){

    let { handleSubmit,currentUser,profile } = this.props
    let { locations } = profile
    let loadData = this.loadData
    console.log("locations",locations)
    return (
      <Form onSubmit={handleSubmit(this.save)}>
        <Form.Item label="头像" {...formItemLayout}>
          <div><Avatar user={currentUser} /></div>
        </Form.Item>
        <Field component={TextField} name="wechat" label="微信"/>
        <Field component={TextField} name="qq" label="qq"/>
        <Field component={TextField} name="mobile" label="手机号码" />
        <Field component={DatePickerField} name="birthday" label="生日" />
        {locations &&
            <Field component={LocationField} name="location_ids" label="城市" locations={locations} />
        }
        <Field component={TextField} name="height" label="身高" />
        <Field component={TextField} name="weight" label="体重" />
        <Field component={TextAreaField} name="summary" label="简介" autosize/>
        <Form.Item>
          <Col span={26} offset={6}>
            {this.state.submitting && <Button><Spin /></Button>}
            {this.state.submitting || <Button onClick={handleSubmit(this.save)}>提交</Button>}
          </Col>
        </Form.Item>
      </Form>
    )
  }
}

let ProfileForm = reduxForm({
  form: "profileForm",
  enableReinitialize: true,
  validate: (values)=>{
    let errors = {}
    // wechat
    if(!values.wechat){
      //errors.wechat = "不可以为空"
    } else {
    }
    // qq
    if(!values.qq){
      //errors.qq = "不可以为空"
    } else {
      if(!/^\d{5,11}$/.test(values.qq)){
        errors.qq = "不是有效的qq号码"
      }
    }
    // email
    if(!values.email){
      //errors.email = "不可以为空"
    } else {
      //if(!isEmail.validate(values.email)){
      //  errors.email = "格式不正确"
      //}
    }
    // mobile
    if(!values.mobile){
      //errors.mobile = "不可以为空"
    } else {
      if(!/^[\d\-]{5,20}$/.test(values.mobile)){
        errors.mobile = "不是有效的电话号码"
      }
    }
    return errors;
  }
})(form)
ProfileForm = connect(
  (state) => {
    return {
      currentUser: state.global.currentUser,
      initialValues: state.profiles.form,
      profile: state.profiles.form
    }
  }
)(ProfileForm)

export default ProfileForm
