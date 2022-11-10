import React, { useState } from "react";
import "./css/postPage.css";
import axios, { Axios } from "axios";
import $ from "jquery";
import {useNavigate} from "react-router-dom"; 
const logoutClick = (e)=>{
  window.location.href = "/";
}
const PostPage = ()=>{
  const navigate = useNavigate();
  let cookieText = decodeURIComponent(document.cookie) 
  let userId = cookieText.slice(cookieText.indexOf("userId")+9, cookieText.length-2);
  axios({
    url: "/postList",
    method: "post",
    data: {
      userId: userId
    }
  }).then((response)=>{
    console.log(response.data.friendData);
    let i = 0;
    while(i<response.data.friendData.length){
      $(".postArea").append(`
        <div class="postBox">
          <div class="postBoxCont">
            ${response.data.friendData[i].wp_cont}
          </div>
          <div class="postBoxBtnArea">
            <div class="writerMenu">
              <h3>Delete</h3>
              <h3>Rewrite</h3>
            </div>
            <h3 class="writerName">${response.data.friendData[i].wp_writer}</h3>
            <div class="nomalMenu">
              <div class="subButton">
                <div class="subIcon"></div>
                <h3 class="subCount">${response.data.friendData[i].wp_sub}</h3>
              </div>
              <div class="likeButton">
                <div class="likeIcon"></div>
                <h3 class="likeCount">${response.data.friendData[i].wp_like}</h3> 
              </div>
            </div>
          </div>
        </div> 
      `);
      console.log(userId)
      if(userId != response.data.friendData[i].wp_writer){
        $(`.postBox:nth-child(${i+1}) .writerMenu`).css({"opacity": "0", "pointer-events":"none"});
      }
      i++;
    }
  });
  return (
    <>
      <section className="postPage">
        <header className="headerArea">
          <div className="menuButton" onClick={()=>{
            $(".headMenuArea").css({"width":"100%", "opacity":"1"});
          }}>MENU</div>
          <div className="headMenuArea">
            <div className="menuHome" onClick={()=>{
              navigate("/main")
            }}>00. HOME</div>
            <div className="menuPost" onClick={()=>{
              navigate("/post")
            }}>01. POST</div>
            <div className="menuFriend">02. FRIEND</div>
            <div className="menuChat">03. CHAT</div>
            <div className="menuClose" onClick={()=>{
              $(".headMenuArea").css({"width":"0%", "opacity":"0"});
            }}>CLOSE</div>
          </div>
          <h1 className="citeTitle">WARD</h1>
          <div className="userDataArea">
            <div className="userNameText">{userId}님 환영합니다.</div>
            <div className="logoutButton" onClick={logoutClick}>Logout</div>
          </div>
        </header>
        <article className="postArea">
          {/* test용 레이아웃 잡아두기
          <div className="postBox">
            <div className="postBoxCont">
              test
            </div>
            <div className="postBoxBtnArea">
              <div className="writerMenu">
                <h3>Delete</h3>
                <h3>Rewrite</h3>
              </div>
              <h3 className="writerName">TEST</h3>
              <div className="nomalMenu">
                <div className="subButton">
                  <div className="subIcon"></div>
                  <h3 className="subCount">0</h3>
                </div>
                <div className="likeButton">
                  <div className="likeIcon"></div>
                  <h3 className="likeCount">0</h3> 
                </div>
              </div>
            </div>
          </div> */}
        </article>
        <article className="btnArea">
          <h3 className="writer">Write</h3>
          <h3 className="up" onClick={()=>{
            window.scrollTo({top:0, behavior:"smooth"});
          }}>Up</h3>
        </article>

      </section>
    </>
  );
}

export default PostPage;