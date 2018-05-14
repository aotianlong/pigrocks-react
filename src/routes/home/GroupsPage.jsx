import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card,Row,Col,notification } from 'antd'
import { push } from "react-router-redux"

import Group from "../../components/Group"
import { Page } from "../../components/Layout"
import HomePage from "../../components/HomePage"
import GroupTopicsTable from "../../components/GroupTopicsTable"
import Breadcrumbs from "../../components/Breadcrumbs"
import { getParams } from "../../lib/service"

class GroupsPage extends Component {


  componentWillMount(){
    this.init()
  }


  init(){
    let { dispatch,match } = this.props
    let { params } = match
    let params2 = getParams()
    dispatch({type: "home_groups/index",...params,...params2})
  }


  gotoPage(page){
    let { dispatch,group } = this.props
    dispatch(push(`/home/groups?page=${page}`))
    this.init()
  }

  render() {
    let { groups, topics, pagination } = this.props

    let breadcrumbs = [
      {name: "群组",path: "/groups"}
    ]

    pagination.onChange = (page)=>{
      this.gotoPage(page)
    }

    return (
      <HomePage>
      </HomePage>
    )
  }
}


GroupsPage = connect(
  (state)=>{
    return {
      groups: state.home_groups.groups,
      pagination: state.home_groups.pagination
    }
  }
)(GroupsPage)

export default GroupsPage
