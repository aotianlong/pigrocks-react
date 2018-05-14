import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Col,Row } from "antd"
import GroupPostForm from "../components/GroupPostForm"
import { Page } from "../components/Layout"

class page extends Component {

  componentWillMount(){
    this.init()
  }

  init(){
    let { dispatch,match } = this.props
    let { params } = match
    dispatch({type: "group_posts/edit",...params})
  }

  render() {
    let { group_post } = this.props
    return (
      <Page>
        <Row gutter={10}>
          <Col span={18}>
            <Card title="修改回复">
              <GroupPostForm />
            </Card>
          </Col>
          <Col span={6}>
          </Col>
        </Row>
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
