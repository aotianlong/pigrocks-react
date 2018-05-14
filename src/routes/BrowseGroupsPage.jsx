import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Input,Form,Pagination,List,Card,Row,Col,notification } from 'antd'
import { push } from "react-router-redux"

import Group from "../components/Group"
import { Page,Sider,Content } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
import { getParams,setTitle } from "../lib/service"
import LoadingPage from "../components/LoadingPage"
import GroupsFilterForm from "../components/GroupsFilterForm"


@connect(
  (state)=>{
    return {
      groups: state.groups.browseGroups,
      pagination: state.groups.browsePagination,
      currentUser: state.global.currentUser
    }
  }
)
export default class BrowseGroupsPage extends Component {

  componentWillMount(){
    this.init()
  }


  init(){
    let { dispatch,match } = this.props
    let { params } = match
    let params2 = getParams()
    dispatch({type: "groups/browse",...params,...params2}).then( (response)=>{
    },(response)=>{
    })
    setTitle("浏览群组")
  }


  gotoPage(page){
    let { dispatch } = this.props
    dispatch(push(`/groups/browse?page=${page}`))
    this.init()
  }

  handleSearchSubmit = (event,values)=>{
    event.preventDefault()
    console.log("handleSearchSubmit",event,values)
  }

  render() {
    let { loading, currentUser,groups, pagination } = this.props

    let breadcrumbs = [
      {name: "群组",path: "/groups"},
      {name: "浏览"}
    ]

    pagination.onChange = (page)=>{
      this.gotoPage(page)
    }

    let handleSearchSubmit = this.handleSearchSubmit

    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs} />

          <Card title="条件选择">
            <GroupsFilterForm />
          </Card>

          <Card title="群组列表">
            <List
              itemLayout="vertical"
              size="large"
              footer={<Pagination pagination={pagination}/>}
            >
              {groups.map( (group)=>{
                return <Group group={group} key={group.id} type="full" />
              })}
            </List>
          </Card>
        </Content>
        <Sider>
        </Sider>
      </Page>
    )
  }
}
