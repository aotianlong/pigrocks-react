import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card,Row,Col,notification } from 'antd'
import { push } from "react-router-redux"

import Group from "../components/Group"
import HomePage from "../components/HomePage"
import GroupTopicsTable from "../components/GroupTopicsTable"
import Breadcrumbs from "../components/Breadcrumbs"
import { getParams } from "../lib/service"
import Like from "../components/Like"

@connect(
  (state)=>{
    return {
      likes: state.likes.likes,
      pagination: state.likes.pagination
    }
  }
)
export default class LikesPage extends Component {


  componentWillMount(){
    this.init()
  }


  init(){
    let { dispatch,match } = this.props
    let { params } = match
    let params2 = getParams()
    dispatch({type: "likes/index",...params,...params2})
  }


  gotoPage(page){
    let { dispatch,group } = this.props
    dispatch(push(`/likes?page=${page}`))
    this.init()
  }

  render() {
    let { likes, pagination } = this.props

    console.log("likes",likes)

    pagination.onChange = (page)=>{
      this.gotoPage(page)
    }

    return (
      <HomePage>
        <Card title="我的收藏">
          {!likes.length && <span>还没有收藏。</span>}
          <Like.List likes={likes} />
        </Card>
      </HomePage>
    )
  }
}
