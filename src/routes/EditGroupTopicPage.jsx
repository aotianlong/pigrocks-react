import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Row,Col } from "antd"
import Icon from "react-fa"
import { Link } from "react-router-dom"

import GroupTopicForm from "../components/GroupTopicForm"
import { Page,Sider,Content } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
import LoadingPage from "../components/LoadingPage"

@connect(
  (state)=>{
    return {
      topic: state.group_topics.form
    }
  }
)
export default class page extends Component {

  componentWillMount(){
    let { match,dispatch } = this.props
    dispatch({type: "group_topics/edit",...match.params})
  }

  render() {
    let { topic } = this.props
    let group = topic.group
    if(!topic){
      return <LoadingPage />
    }
    let topicUrl = `/groups/${topic['group_id']}/topics/${topic['id']}`
    let groupUrl = `/groups/${topic['group_id']}`
    let breadcrumbs = [
      {name: group && group.name,path: groupUrl},
      {name: topic.subject,path: topicUrl},
      {name: "修改"}
    ]
    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs}/>
          <Card title="修改">
            <GroupTopicForm />
          </Card>
        </Content>
        <Sider>
          <Card title="">
            <Link to={topicUrl}><Icon name="reply"/>{' '}返回</Link>
          </Card>
        </Sider>
      </Page>
    )
  }
}
