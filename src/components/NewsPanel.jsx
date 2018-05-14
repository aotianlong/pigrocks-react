import React from "react"
import { Col,Row,Card,Icon } from "antd"
import { connect } from "dva"
import { Link } from "react-router-dom"

import TimeAgo from "./TimeAgo"
import Article from "./Article"
import httpClient from "../lib/http_client"

class NewsPanel extends React.Component {

  componentWillMount() {
    if(this.props.init){
      this.props.init()
    }
  }

  render() {

    let { articles } = this.props

    return(
      <Card title="新闻">
      {
        articles.map((article)=>{
          return (
            <Row key={article.id}>
              <Col span={18}>
                <Link to={`/news/${article.id}`}>{article.title}</Link>
              </Col>
              <Col span={6}>
              <TimeAgo date={article.created_at} />
              </Col>
            </Row>
          )
        })
      }
      </Card>
    )
  }
}

let mapStateToProps = function(state,ownProps){
  return {
    articles: state.newsPanel.articles
  }
}
let container = connect(mapStateToProps)(NewsPanel)
export default container
