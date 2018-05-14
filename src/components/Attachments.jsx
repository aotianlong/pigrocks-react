import React from "react" 
import Attachment from "./Attachment"

let main = (props)=>{
  let { attachments } = props
  attachments = attachments || []
  return (
    <div className="attachments">
      <ul>
        {attachments.map( attachment =>{
          return <li key={attachment.id}><Attachment linked={true} attachment={attachment} /></li>
        })}
      </ul>
    </div>
  )
}

export default main;
