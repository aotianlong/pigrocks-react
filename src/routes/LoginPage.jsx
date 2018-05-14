import React,{ Component } from "react"
import { message,Card ,Row,Col } from "antd"
import { connect } from "dva"
import qs from 'qs'
import { push } from "react-router-redux"

import { Page,Content } from "../components/Layout"
import LoginForm from "../components/LoginForm"
import User from "../components/User"
import { getParams } from "../lib/service"


@connect((state)=>{
  return {
    currentUser: state.global.currentUser,
    redirectTo: state.global.redirectTo
  }
})
export default class LoginPage extends React.Component {

  componentWillReceiveProps(nextProps){
    let { dispatch } = this.props
    if(nextProps.currentUser){
      let params = qs.parse(this.props.location.search,{ ignoreQueryPrefix: true })
      if(params.redirect){
        //dispatch(push(params.redirect))
      }
    }
  }

  componentDidMount(){
    // 获取referer 然后保存
    let referer = document.referer;
    // 计算出redirectTo
    let redirectTo = referer;
    let { dispatch } = this.props
    let params = getParams()
    if(params.redirect){
      redirectTo = params.redirect
    }
    dispatch({type: "global/setState",state: { redirectTo }})
  }

  render() {

    let content = null
    let { redirectTo,currentUser,dispatch } = this.props
    if(!redirectTo){
      redirectTo = "/"
    }
    if(currentUser){
      if(redirectTo){
        dispatch(push(redirectTo))
        message.success("您已经成功登录")
      }
      content = <Card title="欢迎回来"><User.Name user={currentUser} />,您已经成功登录。</Card>
    } else {
      content = <Card title="登录"> <LoginForm /> </Card>
    }

    return(
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              {content}
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}
