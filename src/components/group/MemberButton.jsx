import React from "react"
import { Spin,Button,Modal,Form,Input,message,Badge,Tag } from "antd"
import { connect } from "dva"

import GroupMember from "../../resources/GroupMember"
import Errors from "../Errors"
import _ from "lodash"

@connect(
  (state)=>{
    return {
      currentUser: state.global.currentUser
    }
  }
)
class main extends React.Component {

  joinGroup = (event)=> {
    let { onChange } = this.props
    let groupMember = new GroupMember({group_id: this.props.group.id})
    this.setState({loading: true});
    groupMember.save().then( response =>{
      //message.info("加入成功")
      this.setState({
        showModal: false,
        groupMember: response
      })
      if(onChange){
        onChange(response)
      }
      this.setState({loading: false});
    }, response =>{
      message.error("加入失败")
      this.setState({errors: response,loading: false});
    }).catch( response =>{
      this.setState({errors: response,loading: false});
    })
  }

  quitGroup = (event)=>{
    let { groupMember } = this.state
    let { onChange } = this.props
    this.setState({loading: true})
    GroupMember.destroy(groupMember.id).then( response =>{
      let newGroup = {...this.state.group,groupMember: null}
      this.setState({groupMember: null,group: newGroup})
      message.info("退出成功")
      if(onChange){
        onChange(null)
      }
      this.setState({loading: false})
    }).catch( response =>{
      message.error("退出失败")
      this.setState({loading: false})
    })
  }

  constructor(props){
    super(props)
    this.state = {
      group: props.group,
      groupMember: props.group['group_member'],
      showModal: false,
      errors: null,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("receive new props",nextProps)
    this.setState({
      group: nextProps.group,
      groupMember: nextProps.groupMember || nextProps.group['group_member']
    })
  }

  render() {
    let { group,groupMember,loading } = this.state
    let { currentUser } = this.props
    //console.log("group",group,groupMember,"currentUsr",currentUser)
    if(_.isEmpty(group)){
      return null;
    }
    if(loading){
      return <Button><Spin /></Button>
    }
    if(groupMember){
      switch(groupMember.state){
        case "pending":
          return <span>您的入群请求等待批准中</span>
          break;
        case "blocked":
          return <span>您在本群组黑名单中</span>
          break;
      }
      return (
        <Button type="danger" onClick={this.quitGroup}>退出群组</Button>
      )
    }
    return(
      <Button onClick={this.joinGroup}>加入群组</Button>
    )
  }
}

export default main;
