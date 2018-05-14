import React from 'react';
import { Link } from "react-router-dom"
import { Dropdown,Menu,Button } from "antd"
import { Icon } from "react-fa"

import GroupTopicResource from "../resources/GroupTopic"
import TimeAgo from "./TimeAgo"
import User from "./User"
import Group from "./Group"

import styles from "./GroupTopic.scss"

class main extends React.Component {
  render() {

    let { topic,type,showGroup } = this.props
    switch(type){
      case "li":
        return (
          <li className={styles.groupTopic}>
            {showGroup && <span className={styles.group}>[<Group.Name group={topic.group} />]</span>}
            {' '}
            <Title topic={topic} />
            {' '}
            <span className={styles.user}>
              <User.Avatar type="tiny" user={topic.user} />
              {' '}
              <User.Name user={topic.user} />
            </span>
            <span className={styles.time}>
              {' '}
              <TimeAgo date={topic['created_at']} />
            </span>
          </li>
        )
    }

    return(
      <div>
        <Title topic={topic} />
      </div>
    )
  }
}

main.defaultProps = {showGroup: true}

export class Title extends React.Component {
  render() {
    let { topic } = this.props
    return (
      <Link to={`/groups/${topic['group_id']}/topics/${topic.id}`}>{topic.subject}</Link>
    )
  }
}

export class AdminButton extends React.Component {

  onMenuClick(event){
    let { topic,onDeleted } = this.props
    switch(event.key){
      case "delete":
        let onSuccess = (response)=>{
          console.log("on success")
          if(onDeleted) onDeleted()
        }
        let onError = (response)=>{
          console.log("on error")
        }
        GroupTopicResource.destroy(topic.id).then(onSuccess,onError);
        break;
    }
  }

  render(){
    let { topic } = this.props
    let onMenuClick = this.onMenuClick.bind(this)
    let menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item>
          <Link to={`/groups/${topic['group_id']}/topics/${topic.id}/edit`}>修改</Link>
        </Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    )
    let { children } = this.props
    let button = children || <a>管理<Icon name="chevron-down" /></a>
    return (
      <Dropdown overlay={menu}>
        {button}
      </Dropdown>
    )
  }
}

main.Title =  Title
main.AdminButton = AdminButton

export default main;
