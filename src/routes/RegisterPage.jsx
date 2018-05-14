import React,{ Component } from "react"
import { Row,Col,Card } from "antd"
import { connect } from "dva"

import { Page,Content } from "../components/Layout"
import RegisterForm from "../components/RegisterForm"



@connect((state)=>{
  return {

  }
})
export default class RegisterPage extends React.Component {
  render() {
    return(
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Card title="用户注册">
                <RegisterForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}
