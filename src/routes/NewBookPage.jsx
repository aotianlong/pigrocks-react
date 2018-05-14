import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import BookForm from "../components/BookForm"
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
            <BookForm />
          </Card>
        </Content>
      </Page>
    )
  }
}

