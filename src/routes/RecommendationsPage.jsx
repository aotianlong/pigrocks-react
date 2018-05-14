import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'

import Recommendation from "../components/Recommendation"
import { Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      recommendations: state.recommendations.recommendations
    }
  }
)
export default class page extends Component {

  render() {
    let { recommendations } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {recommendations && recommendations.map( (recommendation)=>{
                return (
                  <li key={recommendation.id}>
                    <Link to={`/recommendations/${recommendation.id}`}>
                      <Recommendation recommendation={recommendation}/>
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

