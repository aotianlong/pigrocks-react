import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Button,Card,Col,Row,List } from 'antd'

import Message from "../components/Message"
import HomePage from "../components/HomePage"
import { getParams } from "../lib/service"

@connect(
  (state)=>{
    return {
      messages: state.messages.messages,
      currentUser: state.global.currentUser
    }
  }
)
export default class page extends Component {

  componentWillMount(){
    let { dispatch,match } = this.props
    let params = {...match.params,...getParams()}
    dispatch({type: "messages/index",params})
  }

  render() {
    let { messages,currentUser } = this.props

    return (
      <HomePage>
        <Card title="站内短信" extra={<Button type="primary"><Link to={`/messages/new`}>写短信</Link></Button>}>
          <List>
            {
              !messages.length && <List.Item>暂无短信</List.Item>
            }
            {messages && messages.map( (message)=>{
              return (
                <Message type="session-list-item" message={message} key={message.id} currentUser={currentUser} />
              )
            }
            )}
          </List>
        </Card>
      </HomePage>
    )
  }
}
