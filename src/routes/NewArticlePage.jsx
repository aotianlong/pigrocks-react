import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import ArticleForm from "../components/ArticleForm"
import { Page,Content } from "../components/Layout"
@connect(
  (state)=>{
    return {
    }
  }
)
export default class page extends Component {

  render() {
    let { deal } = this.props
    return (
      <Page>
        <Content>
          <Card title="新建">
            <ArticleForm />
          </Card>
        </Content>
      </Page>
    )
  }
}
