import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "react-redux"

import Layout,{ Page,Sider,Content } from "../components/Layout"
import TimeAgo from "../components/TimeAgo"
import Commentable from "../components/Commentable"
import Attachments from "../components/Attachments"
import User from "../components/User"
import Breadcrumbs from "../components/Breadcrumbs"


class page extends React.Component {
  render(){
    let blog = this.props.blog || {}
    return (
      <Page>
        <Content>
          <Breadcrumbs />
          <Card>
            <div className="article-detail">
              <div className="title"><h2>{blog.title}</h2></div>
              <div className="meta">
                <ul>
                  <li>时间: <TimeAgo date={blog["created_at"]} /></li>
                  <li>作者: <User.Name user={blog['user']} /></li>
                  <li>点击: {blog["view_count"]}</li>
                  <li>评论: {blog["comments_count"]}</li>
                </ul>
              </div>
              <article className="content">{blog.content}</article>
              <div className="attachments">
                <Attachments attachments={blog.attachments} />
              </div>
            </div>
          </Card>

          <br />
          <div className="commentable">
            <Commentable commentable={blog} />
          </div>

        </Content>
      </Page>
    )
  }
}

page = connect(
  (state)=>{
    return {
      blog: state.blogs.blog
    }
  }
)(page)


export default page;
