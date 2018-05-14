import React from 'react';
class main extends React.Component {
  render() {

    let { book } = this.props

    return(
      <div>
        {JSON.stringify(book)}
      </div>
    )
  }
}

export default main;
