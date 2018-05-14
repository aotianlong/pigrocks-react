import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import TweetForm from "../components/TweetForm"
import { Page } from "../components/Layout"

class page extends Component {

  render() {
    let { tweet } = this.props
    return (
      <Page>
        <Card title="修改">
          <TweetForm />
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
