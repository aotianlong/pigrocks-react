import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Row,Col } from "antd"

import PasswordForm from "../components/PasswordForm"
import { Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
    }
  }
)
export default class page extends Component {

  render() {
    let { blog } = this.props
    return (
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Card title="修改">
                <PasswordForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}
