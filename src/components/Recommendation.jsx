import React from 'react';
import { Link } from "react-router-dom"
import User from "../components/User"
import TimeAgo from "../components/TimeAgo"

class main extends React.Component {
  render() {

    let { recommendation,type,user } = this.props

    switch(type){
      case "user":
        return (
          <div className="recommendation recommendation-type-user">
            <User.Avatar user={user}/>
            {' '}
            <User.Name user={user}/>
            <TimeAgo date={recommendation['created_at']} />
          </div>
        )
    }

    return(
      <div>
        {JSON.stringify(recommendation)}
      </div>
    )
  }
}

// 添加一个连接到该物件的Link Component
class RecommendationLink extends React.Component {
  render(){
    let { children,recommendation } = this.props
    return (
      <Link to={`/recommendations/${recommendation.id}`}>{children}</Link>
    )
  }
}

main.Link = RecommendationLink

export default main;
