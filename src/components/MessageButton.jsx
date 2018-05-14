import React from "react"
import { Link } from 'react-router-dom'
import { Button } from "antd"
import { connect } from "dva"

@connect( (state)=>{
  return {
    currentUser: state.global.currentUser
  }
} )
export default class MessageButton extends React.Component{
  render(){
    let { user,currentUser } = this.props
    if(!currentUser){
      return null
    }
    if(user.id == currentUser.id){
      return null
    }
    return  <Button type="primary"><Link to={`/messages/new?u=${user.username}`}>发送站内信</Link></Button>
  }
}
