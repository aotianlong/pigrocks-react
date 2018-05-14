import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "react-redux"

import Layout,{ Page,Content,Sider } from "../components/Layout"
import Blog from "../components/Blog"
import Breadcrumbs from "../components/Breadcrumbs"


class page extends React.Component {
  render(){
    let { blogs } = this.props
    return (
      <Page>
        <Content>
          <Breadcrumbs />
          <Card title="博客文章列表">
            <Menu>
              {blogs.map(blog =>{
                return <Menu.Item key={blog.id}><Blog blog={blog} /></Menu.Item>
              })}
            </Menu>
          </Card>
          <Card title="博客排行">
            <Menu>

            </Menu>
          </Card>
        </Content>
        <Sider>
        </Sider>
      </Page>
    )
  }
}

page = connect(
  (state)=>{
    return {
      blogs: state.blogs.blogs
    }
  }
)(page)


export default page;
