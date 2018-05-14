import React,{ Component } from "react"
import { connect } from "react-redux"
import { Card,Row,Col,Form,Modal,Button,Input } from "antd"
import LoginForm from "./LoginForm"

class LoginPanel extends React.Component {
  render() {
    console.log("LoginPanel",this.props)
    return(
      <Modal
        title="用户登录"
        visible={this.props.visible}
        onCancel={this.props.handleOnCancel}
        footer={null}
      >
        <LoginForm />
      </Modal>
    )
  }
}

LoginPanel.defaultProps = {
  visible: false
}


let mapStateToProps = function(state,ownProps){
  let props = {
    visible: state.LoginPanel.visible
  }
  return props
}

let mapDispatchToProps = function(dispatch,ownProps){
  return {
    init: ()=>{
      dispatch( (disp,getState) => {
      } )
    },
    handleOnCancel: ()=>{
      dispatch({type: "LOGIN_PANEL_HIDE"})
    },
    handleOnOk: (event)=>{
      console.log(event,this)
    }
  }
}


let container = connect(mapStateToProps,mapDispatchToProps)(LoginPanel)
export default container
