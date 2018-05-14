import React,{ Component } from "react"
import { Pagination,Radio,Table,Card,Row,Col,Menu,Tabs,Button,List } from "antd"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { push } from "react-router-redux"
import Icon from "react-fa"


import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Sider,Content } from "../components/Layout"
import Commentable from "../components/Commentable"
import User from "../components/User"
import GroupTopic from "../components/GroupTopic"

import GroupMemberButton from "../components/group/MemberButton"
import GroupMember from "../components/GroupMember"

const TabPane = Tabs.TabPane


class page extends React.Component {

  componentWillMount(){
    let { dispatch,match } = this.props
    dispatch({type: "group_members/index",...match.params})
  }

  onChange = (value)=>{
    let { dispatch,match } = this.props
    let { params } = match
    let { group_id } = params
    dispatch(push(`/groups/${group_id}/members/${value}`))
    dispatch({type: "group_members/index",...params,status: value})
  }

  render(){
    let { group,members,pagination } = this.props

    if(!group){
      return <Page></Page>
    }

    let onChange = this.onChange
    let groupMember = group['group_member']
    let isAdmin = false
    if(groupMember){
      isAdmin = groupMember.state == "admin"
    }

    return (
      <Page>
        <Content>
          <Card title={group.name}>

            <Tabs onChange={onChange}>
              <Tabs.TabPane key="normal" tab="正式成员"></Tabs.TabPane>
              <Tabs.TabPane key="admin" tab="管理员"></Tabs.TabPane>
              {isAdmin && <Tabs.TabPane key="pending" tab="待加入"></Tabs.TabPane>}
              {isAdmin && <Tabs.TabPane key="blocked" tab="黑名单"></Tabs.TabPane>}
            </Tabs>

            {!members.length && <div className="inner text-center">暂时没有群组成员。</div>}
            <Row>
              {
                members.map( member =>{
                  return <Col span={6} key={member.id}><GroupMember groupMember={member} className="group-member"/></Col>
                } )
              }
            </Row>
            <div className="text-center">
              <Pagination pagination={pagination} />
            </div>
          </Card>
        </Content>
        <Sider>
          <Card title="操作">
            <Link to={`/groups/${group.id}`}>返回{group.name}{' '}<Icon name="reply" /></Link>
          </Card>
        </Sider>
      </Page>
    )
  }
}

page = connect(
  (state)=>{
    return {
      group: state.group_members.group,
      members: state.group_members.members
    }
  }
)(page)


export default page;
