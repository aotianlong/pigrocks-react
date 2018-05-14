import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Button,Card,Row,Col,notification } from 'antd'
import { push } from "react-router-redux"

import Group from "../components/Group"
import { Page,Sider,Content } from "../components/Layout"
import GroupTopicsTable from "../components/GroupTopicsTable"
import Breadcrumbs from "../components/Breadcrumbs"
import { getParams,setTitle } from "../lib/service"
import LoadingPage from "../components/LoadingPage"

class GroupsPage extends Component {

  componentWillMount(){
    this.init()
  }


  init(){
    let { dispatch,match } = this.props
    let { params } = match
    let params2 = getParams()
    dispatch({type: "groups/index",...params,...params2}).then( (response)=>{
    },(response)=>{
    } )
    setTitle("群组")
  }


  gotoPage(page){
    let { dispatch,group } = this.props
    dispatch(push(`/groups?page=${page}`))
    this.init()
  }

  render() {
    let { joinedGroups,loading, currentUser,groups, topics, pagination, recommendedGroups } = this.props

    let breadcrumbs = [
      {name: "群组",path: "/groups"}
    ]

    pagination.onChange = (page)=>{
      this.gotoPage(page)
    }

    let myGroups = null
    if(currentUser){
      myGroups = (
        <Card title="我加入的群组最新主题">
          <GroupTopicsTable topics={topics} withGroup={true} pagination={pagination}/>
        </Card>
      )
    } else {
    }

    if(loading){
      return <LoadingPage />
    }

    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs} />

          {myGroups}
          {false &&
              <Card title="推荐群组" extra={<Link to={`/groups/new`}>创建群组</Link>}>
                <Row>
                  {groups && groups.map( (group)=>{
                    return (
                      <Col key={group.id} span={6}>
                        <div className="group-thumb">
                          <p><Group.Picture group={group} /></p>
                          <p><Group.Name group={group}/></p>
                          <p>{group['users_count']}人</p>
                        </div>
                      </Col>
                    )
                  }
                  )}
                </Row>
              </Card>
          }
        </Content>
        <Sider>
          <Card title="值得加入小组" extra={<Link to={`/groups/browse`}>浏览群组</Link>}>
            <ul className="list-unstyled">
              {recommendedGroups.map( (group)=>{
                return <li key={group.id}><Group group={group} /></li>
              } )}
            </ul>
          </Card>

          {currentUser &&
              <Card title="我加入的小组" extra={<Link to={`/u/${currentUser.username}/groups`}>更多</Link>}>
                <ul className="list-unstyled">
                  {joinedGroups.map( (group)=>{
                    return <li key={group.id}><Group group={group} /></li>
                  } )}
                </ul>
              </Card>
          }
        </Sider>
      </Page>
    )
  }
}


GroupsPage = connect(
  (state)=>{
    return {
      groups: state.groups.groups,
      topics: state.groups.indexTopics,
      pagination: state.groups.pagination,
      currentUser: state.global.currentUser,
      recommendedGroups: state.groups.recommendedGroups,
      joinedGroups: state.groups.joinedGroups,
      loading: state.loading.effects['groups/index']
    }
  }
)(GroupsPage)

export default GroupsPage
