import React from 'react';
import { Link } from "react-router-dom"
import { Markdown } from "react-showdown"
import { Card,Tooltip,Row,Col,List } from "antd"
import classNames from "classnames"

import Likable from "./Likable"
import Icon from "react-fa"
import TimeAgo from "./TimeAgo"



import styles from "./Group.scss"

class main extends React.Component {


  full(){
    let { group } = this.props
    let actions = []
    actions.push(<GroupTopicsCount group={group} />)
    actions.push(<GroupUsersCount group={group} />)
    actions.push(<GroupRepliesCount group={group} />)
    actions.push(<Likable likable={group} />)

    return (
      <List.Item
        className={styles.groupFull}
        actions={actions}
        extra={<GroupPicture group={group} type="thumb" />}
      >
        <List.Item.Meta
          title={<GroupName group={group} />}
          description={<Markdown markup={group.description} />}
        >
        </List.Item.Meta>
      </List.Item>
    )
  }

  render() {

    let { group,type } = this.props

    switch(type){
      case "full":
        return this.full()
        break;
    }

    return(
      <div className={styles.group}>
        <div><GroupPicture group={group} /></div>
        <div><GroupName group={group} /></div>
        <div>
          <span className="count">({group.users_count}人)</span>
        </div>
      </div>
    )
  }
}

function GroupUsersCount(props){
  let { group } = props
  return <Tooltip title="成员数"><Icon name="users" />{' '}{group.users_count}</Tooltip>
}

function GroupTopicsCount(props){
  let { group } = props
  return <Tooltip title="主题数"><Icon name="comments" />{' '}{group.topics_count}</Tooltip>
}

function GroupRepliesCount(props){
  let { group } = props
  return <Tooltip title="回复数"><Icon name="reply" />{' '}{group.posts_count}</Tooltip>
}

class GroupName extends React.Component {
  render(){
    let { group } = this.props
    if(!group) return null;
    return (
      <GroupLink group={group}>{group.name}</GroupLink>
    )
  }
}

class GroupPicture extends React.Component {
  render(){
    let { group,type } = this.props
    let imgProps = Object.assign({},this.props)
    delete imgProps.group
    let src = group.avatars.thumb
    return (
      <GroupLink group={group}><img className={classNames(styles.groupAvatar,styles[type])} src={src} {...imgProps} className={styles.avatar}/></GroupLink>
    )
  }
}

GroupPicture.defaultProps = {
  type: "original"
}

class GroupLink extends React.Component {
  render(){
    let  { children,group } = this.props
    return (
      <Link to={`/groups/${group.id}`}>{children}</Link>
    )
  }
}


export function Header(props){

  let { group } = props
  let title = (
    <span>
      {group.name}
      {' '}
      <TimeAgo date={group.created_at} />
      {' '}
      <Likable likable={group} />
    </span>
  )
  return (
    <Card title={title}>
      <div className="group-header">
        <Row gutter={10}>
          <Col span={8}>
            <GroupPicture group={group} />
          </Col>
          <Col span={16}>
            <div className="group-description">
              <Markdown markup={group.description} />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}


main.Name = GroupName
main.Picture = GroupPicture
main.GroupLink = GroupLink 
main.Header = Header

export default main;
