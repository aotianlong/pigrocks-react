import React from 'react';
import User from "./User"
import { Card,Row,Col } from "antd"
import TimeAgo from "./TimeAgo"
import Attachments from "./Attachments"
import { Markdown } from "react-showdown"

export default class Comment extends React.Component {
  render() {
    let { comment } = this.props
    return (
      <Card>
        <Row gutter={16}>
          <Col span={4}>
            <User.Avatar user={comment.user} />
          </Col>
          <Col span={20}>
            <TimeAgo date={comment.created_at} />
            <div>
              <Markdown markup={comment.content}/>
            </div>
            <div className="attachments">
              <Attachments attachments={comment.attachments} />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
