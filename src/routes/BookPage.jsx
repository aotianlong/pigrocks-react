import React,{ Component } from "react"
import { Card,Row,Col,Menu } from "antd"
import { connect } from "dva"

import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Sider,Content } from "../components/Layout"


class page extends React.Component {
  render(){
    let { book } = this.props
    return (
      <Page>
        <Content>
          <Card>
            {JSON.stringify(book)}
          </Card>
        </Content>
      </Page>
    )
  }
}

page = connect(
  (state)=>{
    return {
      book: state.books.book
    }
  }
)(page)


export default page;
