import React from "react"
import HomePage from "../components/HomePage"
import { Upload,Menu,Row,Col,Form, Input, Card, Button } from "antd"
import { connect } from "dva"

import { Avatar } from "../components/User"
import Side from "../components/home/Side"
import ProfileForm from "../components/ProfileForm"

import ReactImageCrop,{ makeAspectCrop } from "react-image-crop"
import 'react-image-crop/lib/ReactCrop.scss';


let defaultCrop = { x: 20, y: 20, width: 60, height: 60,aspect: 10/10 }


function getCroppedImg(image, pixelCrop, fileName) {

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    resolve(canvas.toDataURL('image/jpeg'))
  });
}


class page extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      crop: defaultCrop,
      src: "http://g.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01fcca8beccecfe9925bc317d7f.jpg",
      file: null,
      previewImage: null
    }
  }

  onChange = (crop)=>{
    this.setState({crop})
  }

  onComplete = (crop,pixelCrop)=>{
    console.log("onChange","crop",crop,"pixelCrop",pixelCrop)
    let { src } = this.state
    let image = new Image()
    image.src = src
    getCroppedImg(image,pixelCrop,"test.jpg").then( (image)=>{
      console.log("image",image)
      this.setState({previewImage: image})
    } )
    this.setState({crop})
  }

  onImageLoaded = (image) => {
    console.log("onImageLoaded",image)
    this.setState({
      crop: defaultCrop,
    });
  }

  render(){

    let onChange = this.onChange

    let options = {
      beforeUpload: (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) =>{
          let result = event.target.result
          this.setState({src: result,file: file})
        }
        return false;
      }
    }

    console.log("crop",this.state.crop)

    let onImageLoaded = this.onImageLoaded
    let onComplete = this.onComplete

    return (
      <HomePage>
        <Upload {...options} fileList={[]}>
          <Button>选择图片</Button>
        </Upload>
        <ReactImageCrop onComplete={onComplete} onImageLoaded={onImageLoaded} src={this.state.src} onChange={onChange} crop={this.state.crop}/>
        <div>
          <img src={this.state.previewImage} />
        </div>
      </HomePage>
    )


  }
}

export default page;
