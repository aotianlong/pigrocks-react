import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import GroupForm from "../components/GroupForm"
import { Page ,Content,Sider } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"

@connect(
  (state)=>{
    return {
    }
  }
)
export default class page extends Component {

  render() {
    let { deal } = this.props
    return (
      <Page>
        <Content>
          <Breadcrumbs />
          <Card title="新建">
            <GroupForm />
          </Card>
        </Content>
        <Sider>
        </Sider>
      </Page>
    )
  }
}

