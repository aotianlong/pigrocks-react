import React, { Component} from 'react';
export default class CheckResource extends Component {
  render() {

    let { resource,children } = this.props
    if(!resource || !resource.error){
      return children
    }
    let message = ""
    let error = resource
    switch(error.errorType){
      case "response":
        let response = error.response
        switch(response.status){
          case 401:
            message = "您没有权限执行此操作"
            break
          case 403:
            message = "您没有权限执行此操作"
            break
          case 404:
            message = "系统没有找到此资源"
            break
          case 500:
            message = "服务器发生错误"
            break
        }
      break;
    }

    return (
      <div className="resource-error">
        {message}
      </div>
    );
  }
}
