import React from "react"
import { Route } from 'react-router-dom'
import Home from 'views/home'
import Add from 'views/add'
import './index.less'

const PageFrame = () => {

    return (
        <>
            <header className="pageFrame-header">
                <div>
                    <img src={require('assets/svg/logo.svg')} className="pageFrame-header_logo" alt="logo" />
                </div>
                <div className="pageFrame-header_user">
                    <img src={require('assets/svg/logo.svg')} className="pageFrame-header_user_avatar" alt="avatar" />
                    <span>lisa</span>
                </div>
            </header>
            <div className="pageFrame-container">
                <div className="pageFrame-container_content">
                    <Route path="/home" component={Home}></Route>
                    <Route path="/add" component={Add}></Route>
                </div>
            </div>
        </>
    )
}

export default PageFrame