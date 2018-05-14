import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"
import TimeAgo from "../components/TimeAgo"

import Layout,{ Page,Sider,Content } from "../components/Layout"
import LoadingPage from "../components/LoadingPage"


class page extends React.Component {
  init(){
    let { match,dispatch } = this.props
    let { params } = match
    dispatch({type: "group_posts/show",...params})
  }
  componentWillMount(){
    this.init()
  }
  render(){
    return <LoadingPage />
  }
}

page = connect(
  (state)=>{
    return {
      group_post: state.group_posts.group_post
    }
  }
)(page)


export default page;
