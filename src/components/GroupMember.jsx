import React from "react"
import { Button } from "antd"

import GroupMember from "../resources/GroupMember"

import User from "./User"
import TimeAgo from "./TimeAgo"
import styles from "./GroupMember.scss"
import classNames from "classnames"


export default class main extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      deleted: false
    }
  }

  destroy = (groupMember)=>{
    console.log("destroy",groupMember)
    GroupMember.destroy(groupMember.id).then( (response)=>{
      console.log("ok")
      this.setState({deleted: true})
    },(response)=>{
      console.log("error")
    })
  }

  approve = (groupMember)=>{
    console.log("approve",groupMember)
    let gm = new GroupMember({id: groupMember.id,state: "normal"})
    gm.save().then( (response)=>{
      console.log("success response")
    },(response)=>{
      console.log("error response")
    })
  }

  block = (groupMember)=>{
    console.log("block",groupMember)
    GroupMember.block(groupMember)
  }

  unblock = (groupMember)=>{
    console.log("unblock",groupMember)
    GroupMember.unblock(groupMember)
  }



  render(){

    if(this.state.deleted){
      return null;
    }

    let { groupMember,isAdmin,type } = this.props
    let { user,state } = groupMember


    let actions = null
    if(isAdmin){
      actions = (
        <div>
          {state == "pending" && <Button type="primary" size="small" onClick={(event)=>this.approve(groupMember)}>批准</Button>}
          {' '}
          <Button type="danger" size="small" onClick={(event)=>this.destroy(groupMember)}>退出</Button>
          {' '}
          {state == "blocked" &&
              <Button type="primary" onClick={(event)=>this.unblock(groupMember)}>解封</Button>
          }
          {' '}
          {state != "blocked" &&
              <Button type="primary" size="small" onClick={(event)=>this.block(groupMember)}>拉黑</Button>
          }
        </div>
      )
    }

    switch(type){
      case "li":
        return (
          <li>
            <User.Avatar user={user} type="tiny" />
            {' '}
            <User.Name user={user} />
            {' '}
            <TimeAgo date={groupMember.created_at} />
          </li>
        )
      default:
        // attributes :id,:level,:state,:posts_count,:topics_count
        return (
          <div className={classNames("text-center","inner",styles['group-member'])}>
            <div><User.Avatar user={user} /></div>
            <div><User.Name user={user} /></div>
            <div><TimeAgo date={groupMember.created_at} />加入</div>
            {actions}
          </div>
        )
    }
  }
}
