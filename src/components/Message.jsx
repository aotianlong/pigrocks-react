import React from 'react';
import { List,Avatar,Badge } from "antd"
import { Link } from "react-router-dom"
import classNames from "classnames"


import User from "../components/User"
import TimeAgo from "../components/TimeAgo"

class Message extends React.Component {
  render() {

    let { message,type,currentUser } = this.props

    let user = null;
    let title = null;
    var isInbox = true

    if(currentUser){
      user = message.sender.id == currentUser.id ? message.receiver : message.sender
      isInbox = message.receiver.id == currentUser.id
    } else {
      user = message.sender
    }

    switch(type) {
      case "list-item":

        title = <span><User.Name user={user} /><TimeAgo date={message['created_at']} /></span>

        return (

          <List.Item className={classNames("message",{inbox: isInbox,unread: message.unread })}>
            <List.Item.Meta
              avatar={<User.Avatar user={user} />}
              title={title}
              description={message.body}
            />
            <Badge count={message['unread_count']} />
          </List.Item>

        )

      case "session-list-item":

        title = <div>
          <div><User.Name user={user} /></div>
          <div><TimeAgo date={message['created_at']} /></div>
          </div>

        return (

          <List.Item className={classNames("message",{unread: message.unread })}>
            <List.Item.Meta
              avatar={<User.Avatar user={user} />}
              title={title}
              description={message.body}
            />
            <Badge count={message['unread_count']} />
            <Link to={`/messages/session/${user.username}`}>更多与{user.username}站内信</Link>
          </List.Item>

        )
      default:
        return(
          <div>
            {JSON.stringify(message)}
          </div>
        )
    }

  }
}

export default Message;
