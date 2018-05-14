import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'

import Book from "../components/Book"
import { Page,Sider,Content } from "../components/Layout"

class page extends Component {

  render() {
    let { books } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {books && books.map( (book)=>{
                return (
                  <li key={book.id}>
                    <Link to={`/books/${book.id}`}>
                      <Book book={book}/>
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
      books: state.books.books
    }
  }
)(page)

export default page
