import React from "react" 
import { Link } from "react-router-dom"

let main = (props)=>{
  let { attachment } = props
  if(!attachment){
    return <div className="attachment"></div>
  }
  let { id } = attachment
  let url = attachment.thumb_url
  if(props.type == "original"){
    url = attachment['url']
  }
  let image = <img src={url} />
  if(props.linked){
    image = <Link to={`/attachments/${id}`}>{image}</Link>
  }
  return (
    <div className="attachment">
      {image}
    </div>
  )
}

export default main;
