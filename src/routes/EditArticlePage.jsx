import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"


import ArticleForm from "../components/ArticleForm"
import { Page,Content,Sider } from "../components/Layout"

class page extends Component {

  render() {
    let { article } = this.props
    return (
      <Page>
        <Content>
          <Card title="修改">
            <ArticleForm />
          </Card>
        </Content>
      </Page>
    )
  }
}


page = connect(
  (state)=>{
    return {
    }
  }
)(page)

export default page
