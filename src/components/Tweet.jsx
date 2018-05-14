import React from 'react';
class main extends React.Component {
  render() {

    let { tweet } = this.props

    return(
      <div>
        {JSON.stringify(tweet)}
      </div>
    )
  }
}

export default main;
