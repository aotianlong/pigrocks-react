import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'
import Article from "../components/Article"
import { Page,Content } from "../components/Layout"

class page extends Component {
  render() {
    let { articles } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {articles && articles.map( (article)=>{
                return (
                  <li key={article.id}>
                    <Link to={`/articles/${article.id}`}>
                      <Article article={article}/>
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


page = connect(
  (state)=>{
    return {
      articles: state.articles.articles
    }
  }
)(page)

export default page
