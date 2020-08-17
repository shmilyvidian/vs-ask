import React from "react";
import { useHistory } from "react-router";

import headerImg from '../../assets/image/header.png'
import contentImg from '../../assets/image/content.jpg'

import './index.less'

const Home = () => {
  const history = useHistory();

  return (
    <div className="index-wrapper">
      <div className="header">
        <img src={headerImg} alt="" className="header-img"/>
      </div>
      <div className="content">
        <img src={contentImg} alt="" className="header-img"/>
      </div>
      <div className="ask-endorsement" onClick={
        () => history.push("/home")
      }>
      </div>
    </div>
  );
};

export default Home;
