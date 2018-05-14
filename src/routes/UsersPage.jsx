import React,{ Component } from "react"
import { connect } from "dva"
import { Link } from "react-router-dom"
import { Card } from 'antd'

import User from "../components/User"
import { Page,Content } from "../components/Layout"

@connect(
  (state)=>{
    return {
      users: state.users.users
    }
  }
)
export default class page extends Component {

  render() {
    let { users } = this.props
    return (
      <Page>
        <Content>
          <Card title="index">
            <ul>
              {users && users.map( (user)=>{
                return (
                  <li key={user.id}>
                    <Link to={`/users/${user.id}`}>
                      <User user={user}/>
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

