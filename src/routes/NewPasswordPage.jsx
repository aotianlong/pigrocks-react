import React from "react"
import { Card,Row,Col } from "antd"

import { Page,Content } from "../components/Layout"

import NewPasswordForm from "../components/NewPasswordForm"
export default class main extends React.Component {
  render() {
    return(
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Card title="找回密码">
                <NewPasswordForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}
