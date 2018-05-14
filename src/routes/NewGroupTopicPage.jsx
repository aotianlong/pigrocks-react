import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Col,Row } from "antd"

import GroupTopicForm from "../components/GroupTopicForm"
import { Page,Content,Sider } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
import UserGroup from "../components/UserGroup"
import LoadingPage from "../components/LoadingPage"
import _ from "lodash"

@connect(
  (state)=>{
    return {
      group: state.group_topics.group
    }
  }
)
export default class NewGroupTopicPage extends Component {

  componentWillMount(){
    let { dispatch,match } = this.props
    dispatch({type: "group_topics/new",...match.params})
  }

  render() {

    let { group } = this.props
    let items = [
      {name: "群组",path: "/groups"},
      {name: group.name,path: `/groups/${group.id}`},
      {name: "发布新帖"}
    ]

    if(_.isEmpty(group)){
      return <LoadingPage />
    }

    return (
      <Page>
        <Content>
          <Breadcrumbs items={items} />
          <Card title="发布新帖">
            <GroupTopicForm />
          </Card>
        </Content>
        <Sider>
          <UserGroup group={group} />
        </Sider>
      </Page>
    )
  }
}
