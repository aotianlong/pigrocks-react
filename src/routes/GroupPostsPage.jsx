import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'


import GroupPost from "../components/GroupPost"
import { Page,Sider,Content } from "../components/Layout"
@connect(
  (state)=>{
    return {
      group_posts: state.group_posts.group_posts
    }
  }
)
export default class page extends Component {

  render() {
    let { group_posts } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {group_posts && group_posts.map( (group_post)=>{
                return (
                  <li key={group_post.id}>
                    <Link to={`/group_posts/${group_post.id}`}>
                      <GroupPost group_post={group_post}/>
                    </Link>
                  </li>
                )
              }
              )}
            </ul>
          </Card>
        </Content>
      </Page>
    )
  }
}

