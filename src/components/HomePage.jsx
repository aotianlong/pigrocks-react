import React from "react"
import { Row,Col } from "antd"
import { Page,Content,Sider } from "../components/Layout"
import Side from "../components/home/Side"
let HomePage = (props)=>{
  let { children } = props
  return (
    <Page>
      <Sider>
        <Side />
      </Sider>
      <Content>
        {children}
      </Content>
    </Page>
  )
}

export default HomePage
