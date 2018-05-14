import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import MessageForm from "../components/MessageForm"
import { Page } from "../components/Layout"

class page extends Component {

  render() {
    let { message } = this.props
    return (
      <Page>
        <Card title="修改">
          <MessageForm />
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
