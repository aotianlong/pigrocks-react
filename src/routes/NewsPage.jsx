import React, {PropTypes} from 'react';
import { Carousel,Row,Col,Card,Tabs } from "antd"
import { connect } from "dva"

import { Page,Sider,Content } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
import Article from "../components/Article"
@connect(
  (state)=>{
    return {
      articles: state.articles.articles,
      recommendations: state.articles.recommendations
    }
  }
)
export default class main extends React.Component {
  render() {

    let { articles,recommendations } = this.props

    return (
      <Page>
        <Breadcrumbs />
        <Content>
          <Card title="今日头条">
            <Tabs>
              <Tabs.TabPane title="头条" tab="y" key="1">
                头条
              </Tabs.TabPane>
              <Tabs.TabPane title="频道" tab="x" key="2">
                频道
              </Tabs.TabPane>
            </Tabs>

          </Card>

          carousel
          {JSON.stringify(recommendations)}
          <Carousel>
            {recommendations.map( recommendation =>{
              return <div key={recommendation.id}>{recommendation.id}</div>
            } )}
          </Carousel>


          <Card title="今日头条">
            {articles.map( article =>{
              return <Article article={article} key={article.id} />
            })}
          </Card>
          <Card title="最新热点">
          </Card>
        </Content>
        <Sider>
          <Card title="x">
          </Card>
        </Sider>
      </Page>
    )
  }
}
