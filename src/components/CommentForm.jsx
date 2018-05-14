import React from "react"
import { Form,Button,Input,Col,Row,message } from "antd"
import Attachable from "./Attachable"
import httpClient from "../lib/http_client"
import Jsona from "jsona"
import User from "./User"

class main extends React.Component {

  constructor(props){
    super(props)
  }

  handleSubmit = (event)=>{
    event.preventDefault()


    let { form,commentable,handleCreate } = this.props
    let values = form.getFieldsValue()
    console.log("values",values)
    let new_values = {}
    let attachments = values.attachments
    let attachment_ids = []
    if(attachments){
      attachment_ids = attachments.map( attachment => attachment.attachment.id )
    }
    new_values.content = values.content
    new_values.attachment_ids = attachment_ids
    return new Promise( (resolve,reject) =>{
      httpClient.post(`comments?commentable_id=${commentable.id}&commentable_type=${commentable.klass}`,{json: new_values})
        .then( response =>{
          if(response.ok){
            message.success("评论成功")
            let comment = new Jsona().deserialize(response.jsonData)
            if(handleCreate){
              handleCreate(comment,this)
            }
            resolve(comment)
          } else {
            reject(response)
          }
        } )
    } )
  }

  render(){
    let { user,form } = this.props
    let { getFieldDecorator } = form

    let attachmentItem = (
      <Form.Item>
        {getFieldDecorator("attachments")(
          <Attachable attachableType="Comment" />
        )}
      </Form.Item>
    )

    attachmentItem = null // 暂时先禁止评论发布图片功能

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={4}>
            <User.Avatar user={user} />
          </Col>
          <Col span={20}>
            <Form.Item>
              {getFieldDecorator("content")(
                <Input.TextArea rows="3" placeholder="输入评论内容..." />
              )}
            </Form.Item>
            {attachmentItem}
            <Form.Item>
              <Button type="primary" htmlType="submit">发布</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

main = Form.create()(main)
export default main
