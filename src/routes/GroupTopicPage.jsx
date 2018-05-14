import React,{ Component } from "react"
import { Tooltip,Button,Badge,List,Tabs,Affix,Spin,Card,Row,Col,Menu } from "antd"
import { connect } from "dva"
import { push } from "react-router-redux"
import Icon from "react-fa"
import _ from 'lodash'
import { Link } from "react-router-dom"

import TimeAgo from "../components/TimeAgo"

import Likable from "../components/Likable"

import Layout,{ Page,Sider,Content } from "../components/Layout"
import GroupPostForm from "../components/GroupPostForm"
import GroupPost from "../components/GroupPost"
import GroupPostList from "../components/GroupPostList"
import Breadcrumbs from "../components/Breadcrumbs"
import User from "../components/User"
import GroupTopic from "../components/GroupTopic"
import LoadingPage from "../components/LoadingPage"
import UserGroup from "../components/UserGroup"
import { getParams,setTitle } from "../lib/service"
import Info from "../components/Info"
import Like from "../components/Like"
import Recommendation from "../components/Recommendation"

@connect(
  (state)=>{
    return {
      topic: state.group_topics.topic,
      posts: state.group_topics.posts,
      pagination: state.group_topics.pagination,
      group: state.group_topics.group,
      selectedPostID: state.group_topics.selectedPostID,
      currentUser: state.global.currentUser,
      recommendations: state.group_topics.recommendations,
      likes: state.group_topics.likes,
      activeTab: state.group_topics.activeTab,
      loading: state.loading.effects['group_topics/show']
    }
  }
)
export default class page extends React.Component {

  componentWillMount(){
    this.init()
  }

  onTabsChange = (key)=>{
    let { dispatch,topic,group,match } = this.props
    let url = `/groups/${topic['group_id']}/topics/${topic.id}`
    let urlParams = getParams()
    switch(key){
      case "recommends":
        dispatch(push(url + "/recommends"))
        dispatch({type: "group_topics/recommends",...match.params,...urlParams}).then( (result)=>{
          console.log("result",result)
        } )
        break;
      case "replies":
        dispatch(push(url))
        dispatch({type: "group_topics/show",...match.params,...urlParams}).then( (group)=>{
          console.log("group",group)
        } )
        break;
      case "likes":
        dispatch(push(url + "/likes"))
        dispatch({type: "group_topics/likes",...match.params,...urlParams})
        break;
      default:
    }
  }

  gotoPage(page){
    let { dispatch,topic } = this.props
    dispatch(push(`/groups/${topic['group_id']}/topics/${topic.id}?page=${page}`))
    this.init()
  }

  init() {
    let { match,dispatch } = this.props
    window.match = match
    let url = match.url
    let urlParams = getParams()
    if(/topics\/\d+\/([^\/]+)$/.test(url)){
      let type = RegExp.$1
      switch(type){
        case "likes":
          dispatch({type: "group_topics/likes",...match.params,...urlParams})
          break
        case "recommends":
          dispatch({type: "group_topics/recommends",...match.params,...urlParams})
          break
        default:
          alert('unknow type:' + type)
      }
    } else {
      dispatch({type: "group_topics/show",...match.params,...urlParams}).then( (topic)=>{
        let title = [topic.subject,topic.group.name]
        setTitle(...title)
      } )
    }
  }

  onGroupMemberChange = (v)=>{
    console.log("on group member change",v)
    //let { dispatch } = this.props
    //dispatch({type: "group_topics/show",state: { group:  }})
    this.init()
  }

  render(){
    let { loading,group,topic,posts,pagination,selectedPostID,recommendations,likes,activeTab } = this.props
    console.log("pagination",pagination)
    let member = group['group_member']

    pagination.onChange = (page)=>{
      this.gotoPage(page);
    }

    if(loading || !topic){
      return <LoadingPage />
    }

    let breadcrumbs = [
      {name: "群组",path: "/groups"},
      {name: group.name,path: `/groups/${topic['group_id']}`},
      {name: topic.subject,path: `/groups/${topic['group_id']}/topics/${topic.id}`}
    ]

    let onTabsChange = this.onTabsChange

    let title = (
      <div>
        {topic.subject}
        {' '}
        <TimeAgo date={topic['created_at']} />
        <br />
        <span>
          <Tooltip title="查看次数">
            <Icon name="eye" />{' '}{topic['view_count']}
          </Tooltip>
          {' '}
          <Likable likable={topic} />
        </span>
        {' '}
        <GroupTopic.AdminButton topic={topic} />
        {' '}
      </div>
    )

    let topicPost = _.clone(topic.post)
    let { attachments } = topicPost
    topicPost.user = topic.user

    let replyButton = null;
    if(member && member['can_write']){
      replyButton = <Button type="primary"><Link to={`/groups/${topic['group_id']}/topics/${topic.id}/posts/new`}>发表回复</Link></Button>
    }
    return (
      <Page>
        <Content>
          <Breadcrumbs items={breadcrumbs} />

          <Card title={title} extra={replyButton}>
            <List itemLayout="vertical" size="large">
              <GroupPost post={topicPost} />
            </List>
          </Card>

          <Card>
            <Tabs onChange={onTabsChange} activeKey={activeTab}>
              <Tabs.TabPane key="replies" tab={<span>回应<Badge count={topic['posts_count'] - 1} /></span>}>
                <GroupPostList posts={posts} pagination={pagination} selectedPostID={selectedPostID} />
              </Tabs.TabPane>
              <Tabs.TabPane key="recommends" tab={<span>推荐<Badge count={0} /></span>}>
                {!recommendations.length && <div className="empty">还没有人推荐。</div>}
                {recommendations.map( (recommendation)=>{
                  return <Recommendation type="user" key={recommendation.id} recommendation={recommendation} />
                } )}
              </Tabs.TabPane>
              <Tabs.TabPane key="likes" tab={<span>收藏<Badge count={topic['likes_count']} /></span>}>
                {!likes.length && <div className="empty">还没有人收藏。</div>}
                {likes.map( (like)=>{
                  return <Like type="user" like={like} key={like.id}/>
                })}
              </Tabs.TabPane>
            </Tabs>
          </Card>

          {false &&
              <Card title="快速回复">
                <GroupPostForm post={{'topic_id': topic.id}} />
              </Card>
          }
        </Content>
        <Sider>
          <Affix>
            <UserGroup group={group} onGroupMemberChange={this.onGroupMemberChange}/>
            <Card>
              <Info title="参与人数" value={topic['participators_count']} />
            </Card>
          </Affix>
        </Sider>
      </Page>
    )
  }
}
