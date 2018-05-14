import React from "react"
import { Avatar,List,Spin } from "antd"

import Group from "../components/Group"
import GroupTopic from "../components/GroupTopic"
import GroupPost from "../components/GroupPost"
import TimeAgo from "../components/TimeAgo"
import Icon from "react-fa"
import Like from "../resources/Like"
import User from "../components/User"

class LikeWrapper extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      deleted: false,
      deleting: false
    }
  }

  deleteLike = (like)=>{
    this.setState({deleting: true})
    Like.destroy(like.id).then( (response)=>{
      this.setState({deleted: true,deleting: false})
      // 执行回调
      if(this.props.onDeleted){
        this.props.onDeleted(like)
      }
    },(response)=>{
      // 删除失败
      this.setState({deleting: false})
    } )
  }


  render(){

    if(this.state.deleted) return null

    let { children,like,dispatch,type } = this.props
    let deleteLike = this.deleteLike

    switch(type){
      case "user":
        return <div className="like like-type-user"><User.Avatar user={like.user} type="tiny" />{' '}<User.Name user={like.user} />{' '}<TimeAgo date={like['created_at']} /></div>
      break;
    }

    return (
      <List.Item className="like">
        {like.likable && children}
        {!like.likable && "已经删除"}
        <span className="time-ago">收藏于{' '}<TimeAgo date={like['created_at']} /></span>
        {' '}
        {this.state.deleting && <Spin />}
        {!this.state.deleting && <a onClick={()=>deleteLike(like)}>
          <Icon name="trash"/>
        </a>
        }
      </List.Item>
    )


  }
}


export let Item = (props)=>{
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">antd</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
  )
}

let main = (props)=>{
  let { like } = props
  let likable = like.likable || {}
  switch(likable.klass){
    case "Group":
      return <LikeWrapper {...props}><Group group={likable} type="li" /></LikeWrapper>
    case "GroupTopic":
      return <LikeWrapper {...props}><GroupTopic topic={likable} type="li" /></LikeWrapper>
    case "GroupPost":
      return <LikeWrapper {...props}><GroupPost post={likable} type="li" /></LikeWrapper>
    default:
      return <LikeWrapper {...props}>{JSON.stringify(likable)}</LikeWrapper>
  }
}

export let LikeList = (props)=>{
  let { likes } = props
  return (
    <List
      itemLayout="horizontal"
      dataSource={likes}
      renderItem={like => (
        <Item type="item" key={like.id} like={like} />
      )}
    >
    </List>
  )
}

main.List = LikeList
main.Item = Item

export default main;
