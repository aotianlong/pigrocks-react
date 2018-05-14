import React from "react"
import { connect } from "dva"
import { Card,Row,Col } from "antd"

import BlogForm from "../components/BlogForm"
import {Page,Content,Sider} from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
@connect(
  (state)=>{
    return {
    }
  }
)
export default class main extends React.Component {

  render(){

    return (
      <Page>
        <Content>
          <Breadcrumbs />
          <Card title="新建日记">
            <BlogForm />
          </Card>
        </Content>
        <Sider>
        </Sider>
      </Page>
    )


  }
}
