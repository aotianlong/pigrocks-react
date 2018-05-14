import React from "react"
import { Card, List, Avatar } from "antd"
import { connect } from "dva"

import { Page,Sider,Content } from "../components/Layout"
import HomePage from "../components/HomePage"
import TimeAgo from "../components/TimeAgo"

@connect(
  (state)=>{
    return {
      currentUser: state.global.currentUser,
      notifications: state.notifications.notifications
    }
  }
)
export default class main extends React.Component {

  componentWillMount(){
    let { dispatch } = this.props
    dispatch({type: "notifications/index"})
  }

  deleteNotification = (notification)=>{
    //console.log("delete notification",notification)
    let { dispatch } = this.props
    dispatch({type: "notifications/destroy",notification})
  }

  render() {

    let { currentUser,notifications } = this.props
    let deleteNotification = this.deleteNotification

    return(
      <HomePage>
        <Card title="通知">
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={notification => (
              <List.Item actions={[<a onClick={(event) => deleteNotification(notification)}>删除</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<TimeAgo date={notification['created_at']} />}
                  description={notification.body}
                />
              </List.Item>
            )}
          />

        </Card>
      </HomePage>
    )
  }
}
