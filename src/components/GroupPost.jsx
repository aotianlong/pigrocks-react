import { Dropdown,Menu,List,Icon,Avatar,Col,Row,Button } from "antd"
import React from 'react';
import classNames from "classnames";

import { Link } from "react-router-dom"
import { Markdown } from "react-showdown"

import User from "./User"
import TimeAgo from "./TimeAgo"
import Attachments from "./Attachments"
import GroupPostResource from "../resources/GroupPost"
import Likable from "../components/Likable"
import GroupTopic from "../components/GroupTopic"


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class main extends React.Component {

  constructor(){
    super()
    this.state = {show: true}
  }


  render() {

    let { post,type } = this.props
    let { user } = post


    if(type == "li"){
      return <div><User user={post.user} /> 回复 <GroupTopic.Title topic={post.topic} /></div>
    } else {
      return this.render_list_item()
    }

  }

  show(){
    this.setState({show: true})
  }

  hide(){
    this.setState({show: false})
  }

  getActions(){
    let { post } = this.props
    let actions = []
    actions.push(<Likable likable={post} />)
    //actions.push(<IconText type="star-o" text="156" />)
    //actions.push(<IconText type="like-o" text="156" />)
    //actions.push(<IconText type="message" text="2" />)
    actions.push(<AdminButton post={post} onDeleted={this.hide.bind(this)}/>)
    return actions;
  }

  render_list_item(){
    let { post,selected } = this.props
    let { user,attachments,first } = post
    let actions = null
    if(!first){
      actions = this.getActions()
    }
    return (
      <Row className={classNames("group-post",{hide: !this.state.show,active: selected})}>
        <Col span={6} className="user-info">
          <p><User.Avatar user={user} /></p>
          <p><User.Name user={user} /></p>
        </Col>
        <Col span={18}>
          <List.Item
            key={post.id}
            actions={actions}
          >
            <List.Item.Meta
              description={<TimeAgo date={post['created_at']} />}
            />
            <div className="body">
              <Body post={post} />
            </div>
            <Attachments attachments={attachments} />
          </List.Item>
        </Col>
      </Row>
    )
  }
}

export let AdminButton = (props)=>{

  let { post,onDeleted,dispatch } = props

  let onMenuClick = (event)=>{
    switch(event.key){
      case "delete":
        let onSuccess = (response)=>{
          console.log("on success")
          if(onDeleted) onDeleted()
        }
        let onError = (response)=>{
          console.log("on error")
        }
        GroupPostResource.destroy(post.id).then(onSuccess,onError);
        break;
    }
  }




  let editUrl = `/groups/${post['group_id']}/topics/${post['topic_id']}/posts/${post.id}/edit`
  let menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="edit">
        <Link to={editUrl}>修改</Link>
      </Menu.Item>
      <Menu.Item key="delete">
        删除
      </Menu.Item>
    </Menu>
  )
  let children = props.children
  let button = children || <a>管理</a>
  return (
    <Dropdown overlay={menu}>
      {button}
    </Dropdown>
  )
}

export let Body = (props)=>{
  let { post } = props
  return <Markdown markup={post.body} />
}

main.AdminButton = AdminButton
main.Body = Body

export default main;
