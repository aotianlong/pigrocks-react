import React from "react"
import classNames from "classnames"
import { Spin } from "antd"
import Like from "../resources/Like"
import { Icon } from "react-fa"
import { connect } from "dva"

/*
 * <Likable likable={deal} />
*/
class Likable extends React.Component {

  constructor(props){
    super(props)
    //console.log("likable",props.likable)
    this.state = {
      likable: props.likable,
      likesCount: props.likable['likes_count'] || 0,
      like: props.likable.like,
      submitting: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      likable: nextProps.likable,
      likesCount: nextProps.likable['likes_count'],
      like: nextProps.likable.like
    })
  }

  toggle = (event) =>{
    event.preventDefault()
    if(this.state.like){
      this.destroy()
    }  else {
      this.create()
    }
  }

  destroy() {
    this.setState({submitting: true})
    let { likable,likesCount,like: sLike } = this.state
    let like = new Like({id: sLike.id})
    like.destroy().then( json =>{
      this.setState({submitting: false,likesCount: likesCount - 1,like: null})
    })
    .catch( response =>{
      this.setState({submitting: false})
    })
  }

  create() {
    this.setState({submitting: true})
    let { likable,likesCount,like: sLike } = this.state
    let like = new Like({
      likable_id: likable.id,
      likable_type: likable.klass
    })
    like.save().then( json =>{
      this.setState({
        like: json,
        submitting: false,
        likesCount: likesCount + 1
      })
    })
    .catch( response =>{
      //console.log("catch",response)
      this.setState({submitting: false})
    })
  }

  render() {
    let { likable,likesCount,like } = this.state
    let { currentUser } = this.props
    if(!currentUser){
      return null;
    }
    //console.log('like',like,likable)
    if(this.state.submitting){
      return <Spin />
    }
    let icon = like ? <Icon name="heart" /> : <Icon name="heart-o" />
    return(
      <a onClick={this.toggle} href="#" className="likable">
        {icon}
        {' '}
        <span className="count">({likesCount})</span>
      </a>
    )
  }
}

Likable.propTypes = {
  //likable: required
}

Likable = connect( (state)=>{
  return {
    currentUser: state.global.currentUser
  }
})(Likable)

export default Likable
