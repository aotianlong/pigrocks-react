import React from "react"
import httpClient,{clientId,getAccessToken} from "../lib/http_client"
import Attachment from "./Attachment"
import { Icon,Modal,Button,Row,Col,Card,Upload } from "antd"
import config from "../config"
import { change } from "redux-form"
import Jsona from "jsona"

class main extends React.Component {

  constructor(props){
    super(props)
    // props要支持以下
    // maxNumber: 最大允许附件数量
    // contentType: 允许的类型
    // maxSize: 最大尺寸

    let fileList = []
    let attachments = props.attachments
    if(attachments){
      fileList = this.AttachmentsToFileList(attachments)
    }


    this.state = {
      attachments: [],
      previewVisible: false,
      previewImage: '',
      fileList
    }

  }

  componentWillReceiveProps(nextProps){
    console.log("component will receive props",nextProps)
    let { attachable } = nextProps
    if(attachable && attachable.attachments != (this.props.attachable && this.props.attachable.attachments)){
      let fileList= this.AttachmentsToFileList(attachable.attachments)
      this.setState({fileList: fileList})
    }
  }

  get attachableId(){

    let attachable = this.props.attachable
    let attachableId = this.props.attachbleId
    if(attachable){
      if(!attachableId){
        attachableId = attachable.id
      }
    }
    return attachableId;
  }

  get attachableType(){
    let attachable = this.props.attachable
    let attachableType = this.props.attachableType
    if(attachable){
      if(!attachableType){
        attachableType = attachable.klass
      }
    }
    return attachableType;
  }

  get klass(){
    return this.props.klass || "Attachment"
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log("preview",file)
    let attachment = file.attachment
    this.setState({
      previewImage: attachment.url,
      previewVisible: true
    });
  }

  cancelPreview = () =>{
    this.setState({previewImage: null,previewVisible: false})
  }

  handleChange = ({ fileList }) => {
    // 设置
    fileList.forEach( file =>{
      let response = file.response
      let jsona = new Jsona();
      if(response){
        let attachment = jsona.deserialize(response)
        file.attachment = attachment
      }
    } )

    this.setState({ fileList })
    // 处理react redux
    let meta = this.props.meta
    let ids = []
    if(meta){
      let form = meta.form
      if(form){
        for(var i=0;i < fileList.length;i++){
          let file = fileList[i]
          let attachment = file.attachment
          let id = attachment && attachment.id
          if(id){
            ids.push(id)
          }
        }
        meta.dispatch(change(form,this.props.input.name,ids))
      }
    }
    if(this.props.onChange){
      this.props.onChange(fileList,ids)
    }
  }

  deleteFile = (file)=>{
    console.log("delete file",file)
    let attachment = file.attachment
    if(attachment){
      return this.deleteAttachment(attachment)
    } else {
      return true;
    }
  }

  deleteAttachment = (attachment)=>{
    return new Promise( (resolve,reject)=>{

      let id = attachment.id
      httpClient.delete(`attachments/${id}`)
        .then( response =>{
          console.log(response)
          let attachments = this.state.attachments
          let index = attachments.indexOf(attachment)
          attachments.splice(index,1)
          this.setState(Object.assign({},{attachments: attachments}))
          resolve(response)
        } )
        .catch( response =>{
          console.log(response)
          reject(response)
        } )


    } )
  }

  AttachmentsToFileList = (attachments)=>{
    // 转换成file list
    let fileList = []
    if(!attachments) {
      attachments = []
    }
    attachments.forEach( attachment =>{
      fileList.push({
        //error: undefined,
        //lastModified: 1494242133000,
        //lastModifiedDate: undefined,
        attachment,
        name: attachment.file_name,
        percent: 100,
        size: attachment.file_size,
        status: "done",
        thumbUrl: attachment.thumb_url,
        type: attachment.content_type,
        uid: `rc-upload-${attachment.id}`
      })
    })
    return fileList;
  }

  render() {

    const { previewVisible, previewImage, fileList } = this.state;
    const { attachableId, attachableType, klass } = this
    let action = `${config.endPoint}attachments?attachable_id=${attachableId || ''}&attachable_type=${attachableType || ''}&type=${klass}`

    let maxLength = this.props.maxLength || 3

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );

    let accessToken = getAccessToken()
    let headers = {ClientID: clientId,"Authorization": `Bearer ${accessToken}`}

    console.log("props",this.props,"state",this.state,"accesstoken",accessToken,"action",action)

    return (
      <div className="attachable">

        <Modal
          title="预览图片"
          visible={this.state.previewVisible}
          onCancel={this.cancelPreview}
          footer={null}
        >
          <div style={{marginLeft: "auto",marginRight: "auto"}}>
            <img src={this.state.previewImage} style={{maxWidth: "100%"}}/>
          </div>
        </Modal>


        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          headers={headers}
          onRemove={this.deleteFile}
          multiple={true}
          accept="image/*"
        >
          {fileList.length >= maxLength ? null : uploadButton}
        </Upload>
      </div>
    )
  }

}

export default main
