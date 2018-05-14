import React from "react"
import { Link } from "react-router-dom"
import { Card,Menu } from "antd"

let Side = (props)=>{

  return (
    <Card title="菜单">
      <Menu>
        <Menu.Item><Link to="/settings">设置</Link></Menu.Item>
        <Menu.Item><Link to="/notifications">通知</Link></Menu.Item>
        <Menu.Item><Link to="/messages">站内信</Link></Menu.Item>
      </Menu>
    </Card>
  )

}

export default Side
