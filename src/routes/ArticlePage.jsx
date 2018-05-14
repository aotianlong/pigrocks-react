import React,{ Component } from "react"
import { Rate,Card,Row,Col,Menu } from "antd"
import { connect } from "dva"

import Layout,{ Page,Content } from "../components/Layout"
import TimeAgo from "../components/TimeAgo"
import Attachments from "../components/Attachments"
import Breadcrumbs from "../components/Breadcrumbs"
import Commentable from "../components/Commentable"
import LoadingPage from "../components/LoadingPage"


class page extends React.Component {
  render(){
    let { article } = this.props
    if(!article){
      return <LoadingPage />
    }
    return (
      <Page>
        <Content>
          <Breadcrumbs />
          <Card>
            <div className="article-detail">
              <div className="title">
                <h2>{article.title}</h2>
              </div>
              <div className="meta">
                <ul>
                  <li><TimeAgo date={article['created_at']} /></li>
                  <li>查看: {article['view_count']}</li>
                  <li><Rate disabled defaultValue={2} /></li>
                </ul>
              </div>
              <Attachments attachments={article.attachments} />
              <article>
                {article.body}
              </article>
            </div>
          </Card>
          <Commentable commentable={article} />
        </Content>
      </Page>
    )
  }
}

page = connect(
  (state)=>{
    return {
      article: state.articles.article
    }
  }
)(page)


export default page;
