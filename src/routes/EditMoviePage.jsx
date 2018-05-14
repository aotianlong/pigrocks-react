import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import MovieForm from "../components/MovieForm"
import { Page } from "../components/Layout"

class page extends Component {
  render() {
    let { movie } = this.props
    return (
      <Page>
        <Card title="修改">
          <MovieForm />
        </Card>
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
