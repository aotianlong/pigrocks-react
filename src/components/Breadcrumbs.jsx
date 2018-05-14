import React, { Component } from "react"
import { connect } from "react-redux"
import { Breadcrumb,Card } from 'antd';
import { Link } from "react-router-dom"
import { Icon } from "react-fa"
import _ from "lodash"

class Breadcrumbs extends Component {

  item(item){
    let icon = null
    if(item.icon){
      icon = <Icon name={item.icon} />
    }
    let link = null
    if(item.path){
      link = <Link to={item.path}>{icon}{' '}{item.name}</Link>
    } else {
      link = item.name
    }
    let key = item.name + item.path || ""
    return <Breadcrumb.Item key={key}>{link}</Breadcrumb.Item>
  }

  render() {

    let { items } = this.props
    items = items || []
    if(!items.length){
      return null;
    }

    items = _.clone(items)
    items.unshift({name: "首页",path: "/",icon: "home"})
    return(
      <Card>
        <Breadcrumb>
          {items.map( item =>{
            return this.item(item)
          })}
        </Breadcrumb>
      </Card>
    )
  }
}

export default Breadcrumbs;
