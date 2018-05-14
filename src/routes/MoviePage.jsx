import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "react-redux"

import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      movie: state.movies.movie
    }
  }
)
export default class page extends React.Component {
  render(){
    let { movie } = this.props
    return (
      <Page>
        <Content>
          <Card>
            {JSON.stringify(movie)}
          </Card>
        </Content>
      </Page>
    )
  }
}
