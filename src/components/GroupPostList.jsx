import React from "react"
import ReactDOM from "react-dom"
import { List,Avatar,Icon } from "antd"
import GroupPost from "./GroupPost"
import scrollToComponent from "react-scroll-to-component"


class main extends React.Component {


  componentDidMount(){
    // 滚动到被selected post
    console.log("selected post",this.selectedPost)
    if(this.selectedPost){
      scrollToComponent(this.selectedPost,{align: "top"})
    }
  }

  render(){
    let { posts,pagination,selectedPostID } = this.props

    //pagination = pagination || {}
    if(selectedPostID){
      selectedPostID = parseInt(selectedPostID)
    }

    //pagination.onChange = (page) => {
    //  console.log("onChange",page)
    //}
    
    console.log("selectedPostID",selectedPostID)

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={pagination}
        dataSource={posts}
        renderItem={item => (
          <GroupPost post={item} selected={item.id == selectedPostID} ref={ c => {
            if(item.id == selectedPostID){
              this.selectedPost = c
            }
          }}/>
        )}
      >
      </List>
    )
  }
}

export default main;
