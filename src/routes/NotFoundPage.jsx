import React,{ Component } from "react"
import { Row,Col,Card } from "antd"

import { Page,Content } from "../components/Layout"

export default class NotFoundPage extends React.Component {
  render() {
    return(
      <Page>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Card title="页面不存在">
                对不起，你访问的页面并不存在。
              </Card>
            </Col>
          </Row>
        </Content>
      </Page>
    )
  }
}

