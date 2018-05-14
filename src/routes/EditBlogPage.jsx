import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import BlogForm from "../components/BlogForm"
import { Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
    }
  }
)
export default class page extends Component {

  render() {
    let { blog } = this.props
    return (
      <Page>
        <Content>
          <Card title="修改">
            <BlogForm />
          </Card>
        </Content>
      </Page>
    )
  }
}
