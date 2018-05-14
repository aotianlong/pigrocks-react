import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import MovieForm from "../components/MovieForm"
import { Page } from "../components/Layout"
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
        <Card title="新建">
          <MovieForm />
        </Card>
      </Page>
    )
  }
}
