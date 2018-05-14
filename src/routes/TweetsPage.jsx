import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'

import Tweet from "../components/Tweet"
import { Page ,Content } from "../components/Layout"


@connect(
  (state)=>{
    return {
      tweets: state.tweets.tweets
    }
  }
)
export default class page extends Component {

  render() {
    let { tweets } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {tweets && tweets.map( (tweet)=>{
                return (
                  <li key={tweet.id}>
                    <Link to={`/tweets/${tweet.id}`}>
                      <Tweet tweet={tweet}/>
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
