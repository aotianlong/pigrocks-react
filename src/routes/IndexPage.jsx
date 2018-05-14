import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"

import { Page,Sider,Content } from "../components/Layout"
import Article from "../components/Article"
import TimeAgo from "../components/TimeAgo"
import User from "../components/User"
import GroupTopic from "../components/GroupTopic"
import Group from "../components/Group"

@connect( (state)=>{
  return {
    users: state.index.users,
    topics: state.index.topics,
    groups: state.index.groups,
    currentUser: state.global.currentUser
  }
})
export default class IndexPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    let { dispatch,currentUser } = this.props
    dispatch({type: "index/index",currentUser})
  }


  userPage(){


    let { users,topics,groups } = this.props

    return (
      <Page>
        <Content>
          <Card title="热帖">
            <ul className="list-unstyled">
              {topics.map( (topic)=>{
                return <GroupTopic type="li" topic={topic} key={topic.id} />
              } )}
            </ul>
          </Card>
        </Content>
        <Sider>
          <Card title="推荐群组">
            <ul className="list-unstyled">
              {groups.map( (group)=>{
                return <li key={group.id}><Group group={group} /></li>
              })}
            </ul>
          </Card>
        </Sider>
      </Page>
    )


  }

  guestPage(){


    let { users,topics } = this.props

    return (
      <Page>
        <Content>
          <Card title="最新会员">
            <Row gutter={10}>
              {users.map( (user)=>{
                return <Col span={4} key={user.id}><User user={user}/></Col>
              } )}
            </Row>
          </Card>
          <Card title="热门帖子">
            <ul className="list-unstyled">
              {topics.map( (topic)=>{
                return <GroupTopic type="li" topic={topic} key={topic.id} />
              } )}
            </ul>
          </Card>
        </Content>
        <Sider>
          <Card title="统计">
          </Card>
        </Sider>
      </Page>
    )



  }

  render() {
    let { currentUser } = this.props
    if(currentUser){
      return this.userPage()
    } else {
      return this.guestPage()
    }
  }
}
