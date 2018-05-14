import React,{ Component} from 'react';
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { Badge,Menu,Dropdown,Icon,Row,Col,Modal } from "antd"
import { Link } from "react-router-dom"
import _ from "lodash"
import { push } from "react-router-redux"
import { Icon as FaIcon } from "react-fa"

//import { LoginPanel } from "./LoginPanel"
import User,{Name,Avatar} from "./User"
import RegisterPanel from "./RegisterPanel"
import LoginPanel from "./LoginPanel"

class NavBar extends Component {


  handleOnSelect = (event)=> {
    return true;
  }


  userDropdown() {
    let userDropdown = null
    let { user,onMenuClick } = this.props
    let totalCount = 0
    if(!_.isEmpty(user)) {
      let notificationsCount = user['notifications_count']
      let messagesCount = user['messages_count']
      totalCount = notificationsCount + messagesCount
      let avatar = <Avatar user={user} type="tiny" rounded />
      //let username = <Name user={user} />
      let username = user.username
      let title = <a>{avatar}{' '}{username}</a>
      let menu = (
        <Menu onClick={onMenuClick}>
          <Menu.Item key="homepage">
            <User.Link user={user}><FaIcon name="home" />{' '}主页</User.Link>
          </Menu.Item>
          <Menu.Item key="settings"><Link to="/settings"><FaIcon name="cog" />{' '}设置</Link></Menu.Item>
          <Menu.Item key="notifications">
            <Link to="/notifications">
              <FaIcon name="bell" />{' '}通知
              <Badge count={notificationsCount} />
            </Link>
          </Menu.Item>
          <Menu.Item key="messages">
            <Link to="/messages">
              <FaIcon name="envelope" />{' '}短信
              <Badge count={messagesCount} />
            </Link>
          </Menu.Item>
          <Menu.Item key="likes">
            <Link to="/likes">
              <FaIcon name="heart" />{' '}收藏
            </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="signOut"><FaIcon name="sign-out" />{' '}退出</Menu.Item>
        </Menu>
      )
      userDropdown = (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Badge count={totalCount}>
            <span>
              {title}
              <Icon type="down" />
            </span>
          </Badge>
        </Dropdown>
      )
    } else {
      let menu = (
        <Menu onClick={this.props.onMenuClick}>
          <Menu.Item><Link to="/register">注册</Link></Menu.Item>
          <Menu.Item><Link to="/login">登录</Link></Menu.Item>
          <Menu.Item key="findPass"><Link to="/password/new">找回密码</Link></Menu.Item>
        </Menu>
      )
      userDropdown = (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Link to="/login">
          未登录
          <Icon type="down" />
          </Link>
        </Dropdown>
      )
    }
    return userDropdown
  }


  render() {
    let userDropdown = this.userDropdown()

    let blogMenu = (
      <Menu title="日记" key="blogs">
        <Menu.Item><Link to="/blogs">所有日记</Link></Menu.Item>
        <Menu.Item><Link to="/blogs/new">写日记</Link></Menu.Item>
      </Menu>
    )

    let blogDropdown = (
      <Dropdown overlay={blogMenu}>
        <Link to="/blogs">日记</Link>
      </Dropdown>
    )

    return (
      <Row>
        <Col span={16}>
          <div className="logo">
            <Link to="/"><img src="https://pig.rocks/assets/logo.png" /></Link>
          </div>
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item><Link to="/">首页</Link></Menu.Item>
            {/*
            <Menu.Item><Link to="/news">新闻</Link></Menu.Item>
            <Menu.Item>
              {blogDropdown}
            </Menu.Item>
            <Menu.Item><Link to="/tweets">叽喳</Link></Menu.Item>
            <Menu.Item><Link to="/movies">电影</Link></Menu.Item>
            <Menu.Item><Link to="/books">图书</Link></Menu.Item>
            */}
            <Menu.Item><Link to="/groups">群组</Link></Menu.Item>
          </Menu>
        </Col>
        <Col span={8} className="text-right">
          {userDropdown}
        </Col>
      </Row>
    );
  }
}

NavBar.contextTypes = { store: PropTypes.object };

let mapStateToProps = function(state,ownProps){
  let props = {user: state.global.currentUser}
  return props
}

let mapDispatchToProps = function(dispatch,getState){
  return {
    onMenuClick: (event) =>{
      let stop = ()=>{
        event.domEvent.stopPropagation()
        event.domEvent.preventDefault()
      }

      switch(event.key){
        case "findPass":
          stop()
          break
        case "signIn":
          stop()
          break
        case "signOut":
          dispatch({type: "global/signOut"})
          stop()
          break
        case "signUp":
          dispatch({type:"REGISTER_PANEL_SHOW"})
          stop()
          break
        case "blogs":
          dispatch(push(`/blogs`))
          stop()
        default:
      }
    }
  }
}

let container = connect(mapStateToProps,mapDispatchToProps)(NavBar)
export default container
