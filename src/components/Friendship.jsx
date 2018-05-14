import React from "react"
import User from "./User"
import TimeAgo from "./TimeAgo"
import FriendButton from "./FriendButton"
import styles from "./Friendship.scss"

export default function main(props){

  let { friendship,friendship: {user,friend} } = props

  return (
    <div className={styles.friendship}>
      <div><User.Avatar user={user} /></div>
      <div><User.Name user={friend} /></div>
      <div><TimeAgo date={friendship.created_at} /></div>
      {/*<FriendButton user={friend}/>*/}
    </div>
  )
}

