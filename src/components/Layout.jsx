import React,{ Component } from "react"
import { Router } from "react-router"
import NavBar from "./NavBar"
import { BackTop,Layout as AntLayout,LocaleProvider,Spin } from "antd"
import { connect } from "dva"
import NProgress from "nprogress"
import config from "../config"

import zh_CN from 'antd/lib/locale-provider/zh_CN';
//import 'moment/locale/zh-cn';

class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}

Layout.defaultProps = {
}

@connect((state)=>{
  return {
    loading: state.loading.global
  }
})
export class Page extends Component {

  render(){

    let { loading } = this.props
    if(loading){
      NProgress.start()
    } else {
      NProgress.done()
    }

    let container = this.props.children

    return(
      <LocaleProvider locale={zh_CN}>
        <AntLayout>
          <AntLayout.Header>
            <Header />
          </AntLayout.Header>
          <AntLayout style={{ padding: '0 20px',margin: '20px 0' }}>
            {container}
          </AntLayout>
          <AntLayout.Footer>
            <Footer />
          </AntLayout.Footer>
          <BackTop />
        </AntLayout>
      </LocaleProvider>
    )
  }
}

export class Header extends Component {


  render() {
    return (
      <NavBar />
    )
  }

}

export class Footer extends Component {

  render() {

    let year = (new Date()).getFullYear();

    return (
      <div className="text-center">
        © 2000 -  {year}
        {' '}
        <a href="http://www.aotianlong.com">傲天龙软件</a>
        {' '}
        <a href="https://pig.rocks">软件版本: {config.version} </a>
        <a href="https://www.linode.com/?r=e9794b613b419cbca39404c16acec172b643e240">Linode</a>
        {' '}
        <a href="https://www.name.com/referral/23652d">域名</a>
        {' '}
        <a href="https://www.pig.rocks/u/aotianlong">雇佣我</a>
      </div>
    )
  }
}

export function Sider(props){
  return <AntLayout.Sider {...props} breakpoint="lg" collapsedWidth="0" style={{backgroundColor: "transparent",margin: "0px 5px"}}/>
}

export function Content(props){
  return <AntLayout.Content {...props} style={{margin: "0px 5px"}}/>
}

export default Layout
