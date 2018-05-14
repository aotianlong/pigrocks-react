import { Affix,Row,Col,Card,Tabs,Pagination } from "antd"
import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { push } from "react-router-redux"


import httpClient from "../lib/http_client"
import Breadcrumbs from "../components/Breadcrumbs"
import { Page,Sider,Content } from "../components/Layout"
import User from "../components/User"
import FriendButton from "../components/FriendButton"
import MessageButton from "../components/MessageButton"
import Like,{LikeList} from "../components/Like"
import Friendship from "../components/Friendship"
import Group from "../components/Group"

import Debug from "../components/Debug"
import Attribute from "../components/Attribute"
import CheckResource from "../components/CheckResource"

const TabPane = Tabs.TabPane

@connect(
  (state)=>{
    return {
      user: state.users.user,
      likes: state.users.likes,
      friends: state.users.friends,
      profile: state.users.profile,
      groups: state.users.groups,
      friendsPagination: state.users.friendsPagination,
      groupsPagination: state.users.groupsPagination,
      likesPagination: state.users.likesPagination
    }
  }
)
export default class main extends React.Component {

  componentWillMount(){
    let { dispatch,match } = this.props
    let { params } = match
    console.log("params",params,match)
    // 解析出url
    let url = match.url
    let username = params.username
    let regexp = new RegExp(`\/u\/${username}(\/\\w+)`,"i")
    console.log("regexp",regexp,url)
    if(regexp.test(url)){
      console.log("resource",RegExp.$1)
      let resource = RegExp.$1
      resource = resource.replace("/","")
      this.onChange(resource)
    } else {
      this.onChange("profile")
    }
  }

  onChange = (key)=>{
    console.log("onChange",key)
    let { dispatch,user,match } = this.props
    let { params } = match
    let { username } = params
    this.setState({activeTab: key})
    switch(key){
      case "profile":
        dispatch(push(`/u/${username}`))
        dispatch({type: "users/show",...params})
        break;
      case "friends":
        dispatch(push(`/u/${username}/friends`))
        dispatch({type: "users/friends",...params})
        break;
      case "likes":
        dispatch(push(`/u/${username}/likes`))
        dispatch({type: "users/likes",...params})
        break;
      case "groups":
        dispatch(push(`/u/${username}/groups`))
        dispatch({type: "users/groups",...params})
        break;
        //default:
        //dispatch({type: "users/show",...params})
    }
  }

  render() {

    let { onTabChange } = this
    let { user,likes,friends,groups,profile,likesPagination,friendsPagination,groupsPagination } = this.props

    let onChange = this.onChange


    if(!user){
      return  <Page></Page>
    }

    let title = user.username
    let { activeTab } = this.state

    return(
      <Page>
        <Sider>

          <Card title={title}>
            <div className="text-center">
              <User.Avatar user={user} />
            </div>
            <br />
            <div>
              <FriendButton user={user} />
              {' '}
              <MessageButton user={user} />
            </div>
          </Card>

        </Sider>
        <Content>

          <Breadcrumbs />


          <Card>
            <Tabs defaultActiveKey="profile" activeKey={activeTab} onChange={onChange}>
              <Tabs.TabPane key="profile" tab="个人信息">
                <CheckResource resource={profile} >
                  <div>
                    <Attribute name="微信" value={profile.wechat}/>
                    <Attribute name="QQ"  value={profile.qq}/>
                    <Attribute name="简介" value={profile.summary} markdown={true} />
                  </div>
                </CheckResource>
              </Tabs.TabPane>
              <Tabs.TabPane key="friends" tab="好友">
                {!friends.length && <div className="inner text-center">还没有好友。</div>}
                <Row gutter={10}>
                  {friends.map( (friend)=>{
                    return <Col span={6}><Friendship key={friend.id} friendship={friend} /></Col>
                  } )}
                </Row>
                <Pagination pagination={friendsPagination} />
              </Tabs.TabPane>
              <Tabs.TabPane key="likes" tab="收藏">
                {!likes.length && <div className="inner text-center">还没有收藏。</div>}
                <LikeList likes={likes} />
                <Pagination pagination={likesPagination} />
              </Tabs.TabPane>
              <Tabs.TabPane key="groups" tab="群组">
                <Row gutter={10}>
                  {groups.map( (group)=>{
                    return <Col span={6}><Group group={group} key={group.id} /></Col>
                  } )}
                </Row>
                <Pagination pagination={groupsPagination} />
              </Tabs.TabPane>
            </Tabs>
          </Card>

        </Content>
     </Page>
    )
  }
}
