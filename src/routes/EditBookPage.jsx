import React,{ Component } from "react"
import { connect } from "dva"
import { Card } from "antd"

import BookForm from "../components/BookForm"
import { Page } from "../components/Layout"

class page extends Component {

  render() {
    let { book } = this.props
    return (
      <Page>
        <Card title="修改">
          <BookForm />
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
