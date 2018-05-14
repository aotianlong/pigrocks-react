import React from "react"
import { Field } from "redux-form"
import { Form,Col } from "antd"

export const formItemLayout = {
  labelCol: {
    xs: { span: 26 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

export function SubmitItem(props){

  return (
    <Form.Item>
      <Col span={26} offset={6}>
        {props.children}
      </Col>
    </Form.Item>
  )

}


export default function main(props){
  if(props.submit){
    return <SubmitItem {...props} />
  } else {
    return <Field {...formItemLayout} {...props} />
  }
}
