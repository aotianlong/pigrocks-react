import React from 'react';
class main extends React.Component {
  render() {

    let { movie } = this.props

    return(
      <div>
        {JSON.stringify(movie)}
      </div>
    )
  }
}

export default main;
