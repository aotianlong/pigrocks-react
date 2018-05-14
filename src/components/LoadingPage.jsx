import React from "react"
import Layout,{ Page } from "./Layout"
import { Card,Spin } from "antd"

let LoadingPage = props =>{
  return (
    <Page>
      <Card>
        <div className="text-center">
          <Spin />
          {' '}页面准备中，请稍后
        </div>
      </Card>
    </Page>
  )
}

export default LoadingPage;
