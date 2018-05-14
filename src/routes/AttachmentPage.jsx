// 用来显示单个附件的页面
import React from "react"
import { Card,Row,Col } from "antd"
import httpClient from "../lib/http_client"
import Jsona from "jsona"
import Icon from "react-fa"

import Attachment from "../components/Attachment"
import { Page,Sider,Content } from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"
import Commentable from "../components/Commentable"
import LoadingPage from "../components/LoadingPage"
import Likable from "../components/Likable"
import TimeAgo from "../components/TimeAgo"
import "../routes/AttachmentPage.scss"

class main extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    let id = this.props.match.params.id
    console.log(id)
    httpClient.get(`attachments/${id}`)
      .then( response =>{
        if(response.ok){
          let data = response.jsonData
          let attachment = new Jsona().deserialize(data)
          this.setState({attachment: attachment})
        } else {
          // error
        }
      }, response =>{
      })
      .catch( response =>{

      })
  }

  render() {
    let { attachment } = this.state
    let items = [
      {name: "查看"}
    ]
    if(!attachment){
      return <LoadingPage />
    }
    return(
      <Page>
        <Content>
          <Breadcrumbs items={items} />
          <Card>
            <div className="attachment-full">
              <Attachment attachment={attachment} type="original"/>
              <div className="meta">
                <Icon name="eye" />
                {' '}
                { attachment['view_count'] }
                {' '}
                <Likable likable={attachment} />
                {' '}
                <TimeAgo date={attachment['created_at']} />
              </div>
            </div>
          </Card>
          {attachment && <Commentable commentable={attachment} />}
        </Content>
        <Sider>
        </Sider>
      </Page>
    )
  }
}

export default main;
