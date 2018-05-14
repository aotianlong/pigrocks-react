import React,{ Component } from "react"
import { connect } from "react-redux"
import { Card,Row,Col,Form,Modal,Button,Input } from "antd"
import RegisterForm from "./RegisterForm"

class RegisterPanel extends React.Component {
  render() {
    return(
      <Modal
        title="用户注册"
        visible={this.props.visible}
        onCancel={this.props.handleOnCancel}
        footer={null}
      >
        <RegisterForm onSubmit={this.props.handleOnSubmit} ref="registerForm"/>
      </Modal>
    )
  }
}

RegisterPanel.defaultProps = {
  visible: false
}


let mapStateToProps = function(state,ownProps){
  let props = {
    visible: state.RegisterPanel.visible
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
      dispatch({type: "REGISTER_PANEL_HIDE"})
    },
    handleOnSubmit: (values)=>{
      console.log("values",values)
      dispatch({type: "REGISTER_USER",user: values})
    },
    handleOnOk: (event)=>{
      console.log(event,this)
    }
  }
}


let container = connect(mapStateToProps,mapDispatchToProps)(RegisterPanel)
export default container
