import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import GroupForm from "../components/GroupForm"
import { Page,Content,Sider } from "../components/Layout"


@connect(
  (state)=>{
    return {
    }
  }
)
export default class page extends Component {

  render() {
    let { group } = this.props
    return (
      <Page>
        <Content>
          <Card title="修改">
            <GroupForm />
          </Card>
        </Content>
      </Page>
    )
  }
}
