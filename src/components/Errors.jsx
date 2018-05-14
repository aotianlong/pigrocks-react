import React, { Component} from 'react';
import { parseError } from "../lib/service"
import _ from 'lodash'
/*
 * {error: "RecordInvalid", message: "验证失败: 用户已经存在了", errors: {user_id: ["已经存在了"]}}
*/
class Errors extends Component {
  render() {

    let errors = this.props.errors
    if(!errors){
      return null;
    }

    let newErrors = errors;
    if(errors.errors){
      newErrors = parseError(errors)
    } else {
      console.log(errors)
    }

    return (
      <div className="errors">
        <ul>
          {_.map(newErrors, (message,key) =>{
            return <li key={key}>{key}{message}</li>
          } )}
        </ul>
      </div>
    );
  }
}

export default Errors;
