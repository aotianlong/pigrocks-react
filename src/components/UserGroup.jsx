import React,{ Component } from "react"
import { Link } from "react-router-dom"
import { Card,Tag,Row,Col } from "antd"
import { connect } from "dva"

import GroupMemberButton from "./group/MemberButton"
import Info from "./Info"

class UserGroup extends React.Component{


  onGroupMemberChange = (v)=>{
    let { onGroupMemberChange } = this.props
    if(onGroupMemberChange){
      onGroupMemberChange(v)
    }
  }

  render(){


    let { groupMember,group,currentUser } = this.props
    if(!currentUser){
      return null
    }
    groupMember = groupMember || group['group_member']
    if(!groupMember){
      //return null
    }
    console.log("groupMember",groupMember)
    return (
      <Card title="我在本群">
        {groupMember && groupMember.state == "normal" &&
        <Row>
          <Col span={8}>
            <Info title="用户等级" value={groupMember.level } bordered />
          </Col>
          <Col span={8}>
            <Info title="主题数" value={groupMember['topics_count']} bordered />
          </Col>
          <Col span={8}>
            <Info title="回复数" value={groupMember['posts_count']} />
          </Col>
        </Row>
        }
        <div className="text-center inner">
          <GroupMemberButton group={group} onChange={this.onGroupMemberChange}/>
          {!groupMember &&
              <div>加入群组后可以发帖</div>
          }
        </div>
      </Card>
    )
  }
}

UserGroup = connect(
  (state)=>{
    return {
      currentUser: state.global.currentUser
    }
  }
)(UserGroup)

export default UserGroup;
