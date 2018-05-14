import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Row,Col } from "antd"
import Icon from "react-fa"
import { Link } from "react-router-dom"

import GroupPostForm from "../components/GroupPostForm"
import { Page,Sider,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      post: state.group_posts.form
    }
  }
)
export default class page extends Component {

  init(){
    let { dispatch,match } = this.props
    let params = match.params
    dispatch({type: "group_posts/new",...params})
  }

  componentWillMount(){
    this.init()
  }

  render() {
    let { post } = this.props
    console.log("post",post)
    return (
      <Page>
        <Content>
          <Card title="新建">
            <GroupPostForm />
          </Card>
        </Content>
        <Sider>
          <Card>
            <Link to={`/groups/${post['group_id']}/topics/${post['topic_id']}`}><Icon name="reply" />返回</Link>
          </Card>
        </Sider>
      </Page>
    )
  }
}
