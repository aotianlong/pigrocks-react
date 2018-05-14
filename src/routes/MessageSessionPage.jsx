import React,{ Component } from "react"
import { Card,Row,Col,Menu,List } from "antd"
import { connect } from "dva"
import { Link } from "react-router-dom"

import TimeAgo from "../components/TimeAgo"
import Layout,{ Page,Sider,Content } from "../components/Layout"
import { getParams } from "../lib/service"
import HomePage from "../components/HomePage"
import Message from "../components/Message"
import User from "../components/User"

@connect(
  (state)=>{
    return {
      messages: state.message_sessions.messages,
      user: state.message_sessions.user
    }
  }
)
export default class MessageSessionPage extends React.Component{


  componentWillMount(){
    let { match,dispatch } = this.props
    let { params } = match
    params = {...params,...getParams()}
    dispatch({type: "message_sessions/show",params}).then(()=> dispatch({type: "message_sessions/read",params}))
  }

  render(){

    let { messages,user } = this.props

    let title = <span>
      与<User.Avatar user={user} type="tiny" /><User.Name user={user} />的历史对话
    </span>

    let extra = <Link to={`/messages`}>短信列表</Link>

    return (
      <HomePage>
        <Card title={title} extra={extra}>
          <List>
            {
              messages && messages.map( (message)=>{
                return <Message type="list-item" message={message} key={message.id}/>
              } )
            }
          </List>
        </Card>
      </HomePage>
    )

  }
}
