import React,{ Component } from "react"
import Comment from "./Comment"
import User from "./User"
import { Card,Button,Alert } from "antd"
import CommentForm from "./CommentForm"
import httpClient from "../lib/http_client"
import { Link } from "react-router-dom"
import Jsona from "jsona"
import PropTypes from "prop-types"
import { connect } from "dva"
import scrollToComponent from "react-scroll-to-component"


@connect((state)=>{
  return {
    currentUser: state.global.currentUser
  }
})
export default class Commentable extends Component {

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentWillMount() {
    this.getComments(1)
  }

  constructor(props) {
    super(props)
    this.comments = {}
    this.state = {
      comments: this.props.comments || [],
      commentable: this.props.commentable,
      totalPages: this.props.totalPages,
      currentPage: this.props.currentPage,
      submitting: false
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("receive props",nextProps)
    //this.setState({commentable: nextProps.commentable})
  }

  reset() {
    this.refs.content.value = ""
  }

  handleCreate = (comment,form)=>{
    //console.log("handle create",comment)
    let comments = this.state.comments
    comments.unshift(comment)
    this.setState({comments: comments})
    form.props.form.resetFields();
    scrollToComponent(this.comments[comment.id],{align: "top"})
  }

  createComment = (event) => {
    event.preventDefault()
    let content = this.refs.content.value
    this.setState({submitting: true})

    httpClient.post("comments",{content: content,attachment_ids: attachment_ids})
      .then((response) =>{
        let json = new Jsona().deserialize(response.jsonData)
        console.log(json)
        // 在comments顶部插入
        let comments = this.state.comments
        comments.unshift(json)
        this.setState({comments: comments})
        // 重置form
        this.reset()
        this.setState({submitting: false})
      })
      .catch((response)=>{
        console.log(response)
        this.setState({submitting: false})
      })
  }


  getComments(page) {
    httpClient.get("comments",{
      query:{
        page: page,
        commentable_type: this.state.commentable.klass,
        commentable_id: this.state.commentable.id
      }
    })
    .then( response => {
      let json = response.jsonData
      let comments = new Jsona().deserialize(json)
      this.setState({comments})
    } )
    .catch( (response) => {
      console.log(response)
    } )
  }

  form() {
    let { commentable,currentUser } = this.props

    if(currentUser) {

      let error_message = null
      if(this.state.error_message) {
        error_message = <Alert>{this.state.error_message}</Alert>
      }

      return (
        <div className="comment-box">
          <div className="body">
            <CommentForm handleCreate={this.handleCreate} handleSubmit={this.createComment} user={currentUser} commentable={commentable}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="comment-box">
          <div className="avatar desktop">
            <User.Avatar />
          </div>
          <div className="body">
            评论需要登录。
            <Link to="/login">登录</Link>
            <Link to="/register">注册</Link>
          </div>
        </div>
      )
    }
  }

  render() {

    let { comments } = this.state

    return (
      <div>
        {comments.map( comment =>{
          return <Comment key={comment.id} comment={comment} ref={ (c) => this.comments[comment.id] = c }/>
        } )}
        <Card title="发表评论">
          {this.form()}
        </Card>
      </div>
    )
  }
}


Commentable.defaultProps = {
  title: "评论",
  comments: [],
  commentable: {}
}

