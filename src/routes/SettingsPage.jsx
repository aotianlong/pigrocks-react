import React from "react"
import { Menu,Row,Col,Form, Input, Card, Button } from "antd"
import { connect } from "dva"
import { Avatar } from "../components/User"
import ProfileForm from "../components/ProfileForm"
import LoadingPage from "../components/LoadingPage"
import HomePage from "../components/HomePage"



@connect((state)=>{
  return {
    currentUser: state.global.currentUser,
    loading: state.loading.effects['profiles/edit']
  }
})
export default class main extends React.Component {

  componentWillMount(){
    let { dispatch,currentUser } = this.props
    let { id: userId } = currentUser
    dispatch({type: "profiles/edit",userId})
  }


  render() {

    let { currentUser,loading } = this.props;

    if(loading){
      return <LoadingPage />
    }

    return(
      <HomePage>
        <Card title="设置">
          <ProfileForm />
        </Card>
      </HomePage>
    )
  }
}
