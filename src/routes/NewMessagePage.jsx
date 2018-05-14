import React,{ Component } from "react"
import { connect } from "dva"
import { Card,Button } from "antd"
import { Link } from "react-router-dom"

import MessageForm from "../components/MessageForm"
import { Page,Content } from "../components/Layout"
import { getParams } from "../lib/service"
import HomePage from "../components/HomePage"

@connect(
  (state)=>{
    return {
      message: state.messages.form
    }
  }
)
export default class page extends Component {

  componentWillMount(){
    let { dispatch,match } = this.props
    let { params } = match
    params = {...params,...getParams()}
    console.log("params",params)
    dispatch({type: "messages/new",params})
  }

  render() {
    let { deal } = this.props
    return (
      <HomePage>
        <Card title="新建" extra={<Button><Link to="/messages">返回列表</Link></Button>}>
          <MessageForm />
        </Card>
      </HomePage>
    )
  }
}

