import React from "react"
import { Table } from "antd"
import { Link } from "react-router-dom"

import GroupTopic from "./GroupTopic"
import TimeAgo from "./TimeAgo"
import User from "./User"
import Group from "./Group"


let title_column = {
  key: "title",
  dataIndex: "title",
  title: "标题",
  width: "40%",
  render: (text,record)=>{
    return <GroupTopic.Title topic={record} />
  }
}

let created_at_column = {
  key: "created-at",
  dataIndex: "created-at",
  title: "日期",
  width: "15%",
  render: (text,record)=>{
    return <TimeAgo date={record['created_at']} />
  }
}

let user_column = {
  key: "user",
  dataIndex: "user",
  title: "作者",
  width: "15%",
  render: (text,record)=>{
    return(
      <div>
        <p><User.Avatar type="tiny" user={record.user} /></p>
        <p><User.Name user={record.user} /></p>
      </div>
    )
  }
}

let last_post_column = {
  key: "last-post",
  dataIndex: "last-post",
  title: "最后回复",
  width: "20%",
  render: (text,record)=>{
    //console.log("last-post",record['last-post'])
    let lastPost = record['last_post']
    if(lastPost) {
      let userName = lastPost['user_name']
      return (
        <div>
          <div><Link to={`/u/${userName}`}>{userName}</Link></div>
          <div><Link to={`/groups/${record['group_id']}/topics/${record['id']}`}><TimeAgo date={lastPost['created_at']} /></Link></div>
        </div>
      )
    } else {
      return null;
    }
  }
}

let posts_count_column = {
  key: "posts-count",
  dataIndex: "posts-count",
  title: "回复/查看",
  width: "15%",
  render: (text,record)=>{
    return <span>{record['posts_count'] - 1}/{record['view_count']}</span>
  }
}

let group_column = {
  key: "group",
  dataIndex: "group",
  title: "群组",
  width: "15%",
  render: (text,record)=>{
    return (
      <Group.Name group={record.group} />
    )
  }
}

let columns = []
columns.push(title_column)
columns.push(posts_count_column)
columns.push(created_at_column)
columns.push(user_column)
columns.push(last_post_column)


let columns_with_group = []
columns_with_group.push(Object.assign({},title_column,{width: "25%"}))
columns_with_group.push(posts_count_column)
columns_with_group.push(group_column)
columns_with_group.push(created_at_column)
columns_with_group.push(user_column)
columns_with_group.push(last_post_column)

let main = (props)=>{
  let { topics,pagination } = props

  let table_columns = []
  if(props.withGroup){
    table_columns = columns_with_group
  } else {
    table_columns = columns
  }

  return (
    <Table rowKey={record => record.id} dataSource={topics} columns={table_columns} pagination={pagination}/>
  )
}
export default main;
