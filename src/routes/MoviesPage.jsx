import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'

import Movie from "../components/Movie"
import { Page,Content,Sider } from "../components/Layout"

@connect(
  (state)=>{
    return {
      movies: state.movies.movies
    }
  }
)
export default class page extends Component {

  render() {
    let { movies } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {movies && movies.map( (movie)=>{
                return (
                  <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                      <Movie movie={movie}/>
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
