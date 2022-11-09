import React, { useState } from "react";
import "./css/postPage.css";
import axios, { Axios } from "axios";
import $ from "jquery";
import {useNavigate} from "react-router-dom"; 
const logoutClick = (e)=>{
  window.location.href = "/";
}
const PostPage = ()=>{
  return (
    <>
      <section className="postPage">
        <header className="headerArea">
          <div className=""></div>
          <h1 className="citeTitle">WARD</h1>
          <div className="userDataArea">
            <div className="userNameText">준영님 환영합니다.</div>
            <div className="logoutButton" onClick={logoutClick}>Logout</div>
          </div>
        </header>
      </section>
    </>
  );
}

export default PostPage;