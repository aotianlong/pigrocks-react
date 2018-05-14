import React,{ Component } from "react"
import { Switch,BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import store,{ history } from "../store"
import Routes from "./Routes"

import localStore from "../lib/store"
import { signIn } from "../actions"
import { setToken,refreshAccessToken } from "../actions/loginForm"



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidCatch(error) {
    console.log("component did catch",error)
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.defaultProps = {
}
