import React,{ Component } from "react"
import { Affix,Table,Card,Row,Col,Menu,Tabs,Button,Input } from "antd"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { push } from "react-router-redux"
import qs from "qs"
import _ from "lodash"
import Icon from "react-fa"

import Likable from "../components/Likable"
import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Sider,Content } from "../components/Layout"
import Commentable from "../components/Commentable"
import User from "../components/User"
import GroupTopic from "../components/GroupTopic"
import { Header as GroupHeader} from "../components/Group"

import GroupMemberButton from "../components/group/MemberButton"
import GroupMember from "../components/GroupMember"
import GroupTopicsTable from "../components/GroupTopicsTable"

import Breadcrumbs from "../components/Breadcrumbs"
import LoadingPage from "../components/LoadingPage"
import UserGroup from "../components/UserGroup"
import { getParams } from "../lib/service"
import Info from "../components/Info"

const TabPane = Tabs.TabPane

@connect(
  (state)=>{
    return {
      group: state.groups.group,
      topics: state.groups.topics,
      users: state.groups.users,
      pagination: state.groups.pagination,
      groupMembers: state.groups.groupMembers
    }
  }
)
export default class page extends React.Component {

  init(){
    let { dispatch,match } = this.props
    let params = getParams()
    dispatch({type: "groups/show",...params,...match.params})
  }

  componentWillMount(){
    this.init()
  }

  gotoPage(page){
    let { dispatch,group } = this.props
    dispatch(push(`/groups/${group.id}?page=${page}`))
    this.init()
  }

  onFilterTabChange = (key)=>{
    console.log("tab change",key)
  }

  render(){
    let { group,topics,pagination,match,groupMembers } = this.props

    let groupMember = group['group_member']

    let breadcrumbs = [
      {name: "群组",path: "/groups"},
      {name: group.name,path: `/groups/${group.id}`},
    ]

    if(_.isEmpty(group)){
      return <LoadingPage />
    }

    let extra = null
    if(groupMember && groupMember.can_write){
      extra = <Button type="primary"><Link to={`/groups/${group.id}/topics/new`}>发布新帖</Link></Button>
    }

    pagination.onChange = (page)=>{
      this.gotoPage(page)
    }

    let onFilterTabChange = this.onFilterTabChange


    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs} />
          <GroupHeader group={group} />

          <Card title="主题列表" extra={extra}>
            {/*
              <Tabs onChange={onFilterTabChange} activeKey="all">
                <TabPane tab="全部" key="all"></TabPane>
                <TabPane tab="精华" key="digest"></TabPane>
                {groupMember &&
                    <TabPane tab="我的" key="mine"></TabPane>
                }
              </Tabs>
              <Input type="search" />
              */}
              <GroupTopicsTable topics={topics} withGroup={false} pagination={pagination}/>
            </Card>

          </Content>
          <Sider>

            <Affix>
              <Card title="小组成员" extra={<Link to={`/groups/${group.id}/members`}>更多{' '}<Icon name="arrow-right" /></Link>}>

                <ul className="list-unstyled">
                  {groupMembers.map( (groupMember)=>{
                    return <GroupMember groupMember={groupMember} key={groupMember.id} type="li"/>
                  } )}
                </ul>

              </Card>

              <UserGroup group={group}/>

              <Card title="统计">
                <Row>
                  <Col span={8}>
                    <Info title="成员数" value={group['users_count']}/>
                  </Col>
                  <Col span={8}>
                    <Info title="主题数" value={group['topics_count']}/>
                  </Col>
                  <Col span={8}>
                    <Info title="回复数" value={group['posts_count']}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Info title="今日回复数" value={group['today_posts_count']}/>
                  </Col>
                  <Col span={12}>
                    <Info title="今日主题数" value={group['today_topics_count']}/>
                  </Col>
                </Row>
              </Card>
            </Affix>

          </Sider>
      </Page>
    )
  }
}
