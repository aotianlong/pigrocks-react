import React from 'react';
import { Link } from "react-router-dom"


class main extends React.Component {
  render() {

    let { article } = this.props

    return(
      <div className="article">
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </div>
    )
  }
}

export default main;
