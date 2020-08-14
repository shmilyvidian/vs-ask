import React from "react"
import { Route } from 'react-router-dom'
import { useHistory } from "react-router";
import Home from 'views/home'
import Add from 'views/add'
import Index from 'views/index'
import './index.less'

const PageFrame = () => {
  const history = useHistory();

  // 回到首页
  function linkIndex(){
    history.push("/");
  }
  return (
    <>
    <div className="bg-wrapper">
      <header className="pageFrame-header">
        <div onClick={linkIndex}>
          <img src={require('assets/svg/logo.svg')} className="pageFrame-header_logo" alt="logo" />
        </div>
        <div className="pageFrame-header_user">
          <img src={require('assets/image/user.png')} className="pageFrame-header_user_avatar" alt="avatar" />
          <span>lisa</span>
        </div>
      </header>
      <div className="pageFrame-container">

        <div className="pageFrame-container_content">
        <Route path="/index" component={Index}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/add" component={Add}></Route>
        </div>
      </div>
      </div>
    </>
  )
}

export default PageFrame