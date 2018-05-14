import React from "react"
import { Link } from "react-router-dom"

let blog = (props)=>{
  let { blog } = props
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export default blog;
