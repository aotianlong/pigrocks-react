import React from "react"
import { Button } from "antd"
import { connect } from "dva"
import Friendship from "../resources/Friendship"


@connect((state)=>{
  return {
    currentUser: state.global.currentUser
  }
})
export default class FriendButton extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      friendship: null
    }
  }

  addFriend = (event)=>{
    console.log('add friend',event)
    let { user } = this.props
    let friendship = new Friendship({friend_id: user.id})
    friendship.save().then( (response)=>{
      //ok
      this.setState({friendship: response})
    },(response)=>{
      //error
    } )
  }

  removeFriend = (event)=>{
    console.log('remove friend',event)
  }


  isFriend(){
    let { currentUser,isFriend,friendIds } = this.props
    if(currentUser){
      if(friendIds === null){
        friendIds = currentUser.friendIds
      }
      if(friendIds){
        return _.includes(friendIds,user.id)
      } else {
        // currentUser没有friendIds，需要用其他方式判断
        if(isFriend !== null){
          return isFriend;
        }
        return false
      }
    } else {
      return false;
    }
  }

  render(){

    let { user,currentUser } = this.props

    // 未登录不显示
    if(!currentUser){
      return null
    }

    // 当前用户是自己，不显示
    if(user.id == currentUser.id){
      return null;
    }

    let isFriend = this.isFriend()
    if(isFriend){
      return <Button type="danger" onClick={this.removeFriend}>取消好友</Button>
    } else {
      return (
        <Button type="primary" onClick={this.addFriend}>加为好友</Button>
      )
    }
  }
}


FriendButton.defaultProps = {
  friendIds: null,
  isFriend: null
}
