import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"

import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      message: state.messages.message
    }
  }
)
export default class page extends React.Component {
  render(){
    let { message } = this.props
    return (
      <Page>
        <Content>
          <Card>
            {JSON.stringify(message)}
          </Card>
        </Content>
      </Page>
    )
  }
}
