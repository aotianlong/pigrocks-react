import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"
import TimeAgo from "../components/TimeAgo"

import Layout,{ Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      recommendation: state.recommendations.recommendation
    }
  }
)
export default class page extends React.Component {
  render(){
    let { recommendation } = this.props
    return (
      <Page>
        <Content>
          <Card>
            {JSON.stringify(recommendation)}
          </Card>
        </Content>
      </Page>
    )
  }
}
