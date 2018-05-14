import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"

import TimeAgo from "../components/TimeAgo"
import { Page,Sider,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      tweet: state.tweets.tweet
    }
  }
)
export default class page extends React.Component {
  render(){
    let { tweet } = this.props
    return (
      <Page>
        <Content>
          <Card>
            {JSON.stringify(tweet)}
          </Card>
        </Content>
      </Page>
    )
  }
}
