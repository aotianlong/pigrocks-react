import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card,Col,Row } from 'antd'

import GroupTopic from "../components/GroupTopic"
import { Page,Content } from "../components/Layout"
import GroupTopicsTable from "../components/GroupTopicsTable"
import Breadcrumbs from "../components/Breadcrumbs"

@connect(
  (state)=>{
    return {
      topics: state.group_topics.topics
    }
  }
)
export default class page extends Component {

  render() {
    let { topics } = this.props

    let breadcrumbs = [
      {name: "群组",path: "/groups"},
      {name: group.name,path: `/groups/${group.id}`},
    ]

    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs} />
          <Card title="主题列表">
            <GroupTopicsTable topics={topics} withGroup={true}/>
          </Card>
        </Content>
        <Sider>
        </Sider>
      </Page>
    )
  }
}
