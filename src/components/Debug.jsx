import React from "react"

export default class Debug extends React.Component {
  render(){
    let { value } = this.props
    return (
      <div className="debug">
        {JSON.stringify(value)}
      </div>
    )
  }
}
