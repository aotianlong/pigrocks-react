import React,{ Component } from "react"
import classNames from "classnames"
import _ from "lodash"
import { Link } from "react-router-dom"
import FriendButton from "./FriendButton"
import MessageButton from "./MessageButton"
import TimeAgo from "./TimeAgo"
import styles from "./User.scss"

let User = (props)=> {
  let { user,showActions,showCreatedAt } = props

  return (
    <div className={styles.user}>
      <div><Avatar user={user} /></div>
      <div><Name user={user} /></div>
      {showCreatedAt && <div><TimeAgo date={user['created_at']} /></div>}
      {showActions &&
      <div>
        <FriendButton user={user} />
        <MessageButton user={user} />
      </div>
      }
    </div>
  )
}


User.defaultProps = {
  showActions: true,
  showCreatedAt: true
}

let UserLink = (props)=>{
  let { user } = props
  return <Link to={`/u/${user.username}`}>{props.children}</Link>
}

let Name = (props)=> {
  let { user,linked } = props
  if(_.isEmpty(user)) return null
  let username = user.username
  if(linked){
    return (
      <UserLink user={user}>
        {username}
      </UserLink>
    )
  } else {
    return username;
  }
}

Name.defaultProps = {
  linked: true
}

let Avatar = (props)=> {
  let { user,linked } = props
  if(_.isEmpty(user)) return null
  let src = user.avatars && user.avatars[props.type]
  if(!src) src = "/assets/no_avatar.gif"
  let image = (
    <img
      src={src}
      alt={user.username}
      className={classNames("avatar",`avatar-${props.type}`,{"img-circle": props.rounded})}
    />
  )
  if(linked){
    return <UserLink user={user}>{image}</UserLink>
  } else {
    return image
  }
}

Avatar.defaultProps = {
  user: {},
  type: "thumb",
  rounded: false,
  linked: false
}

User.Avatar = Avatar
User.Name = Name
User.Link = UserLink

export {UserLink as Link,Avatar,Name}
export default User
