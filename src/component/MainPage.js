import React, { useState } from "react";
import "./css/mainPage.css";
import axios, { Axios } from "axios";
import $ from "jquery";
const intro = ()=>{
  $(".stick:nth-child(odd)").css({"transform":"translateY(-150vh)"});
  $(".stick:nth-child(even)").css({"transform":"translateY(150vh)"});
}
const menuTextHover = (e)=>{
  e.preventDefault();
  {/**리액트는 이벤트핸들러를 인라인방식으로 해야함 */}
  $(".menuArea").css({"box-shadow":"inset 0rem 10rem 0 10rem #111"});
  $(".menuText").css("color", "#333");
  $(e.target).css("color", "white");
  switch(e.target.id){
    case "menuText1":
      $(".menuBackText").text("POST");
      break;
    case "menuText2":
      $(".menuBackText").text("FRIEND"); 
      break;
    case "menuText3":
      $(".menuBackText").text("CHAT");
      break;
    default:
      break;
  }
  $(".menuBackText").css({"opacity":"0.3"});
}
const menuTextOut = (e)=>{
  e.preventDefault();
  $(".menuArea").css("box-shadow", "inset 0rem 0rem 0 0rem #111");
  $(".menuText").css("color", "#111"); 
  $(".menuBackText").css({"opacity":"0"});
}
const MainPage = ()=>{
  setTimeout(()=>{
    intro();
    setTimeout(()=>{
      $(".introArea").css({"display":"none"});
    }, 1000);
  }, 700);
  return (
    <>
      <section className="mainPage">
        <article className="introArea">
          <div className="stick"></div>
          <div className="stick">W</div>
          <div className="stick">A</div>
          <div className="stick">R</div>
          <div className="stick">D</div>
          <div className="stick"></div>
        </article>  
        <article className="mainArea">
          <header className="headerArea">
            <h1 className="citeTitle">WARD</h1>
          </header>
          <main className="mainContent">
            <div className="myNameText">
              <h1>Jun</h1>
              <h2>
                Young
                <sub>portfoilo</sub>
              </h2>
            </div>
            <ul className="menuArea">
              <h1 className="menuBackText">TEST</h1>
              <li className="menuText" id="menuText1" onMouseEnter={menuTextHover} onMouseOut={menuTextOut}>
                01.<br></br>
                POST
              </li>
              <li className="menuText" id="menuText2" onMouseEnter={menuTextHover} onMouseOut={menuTextOut}>
                02.<br></br>
                Friend
              </li>
              <li className="menuText" id="menuText3" onMouseEnter={menuTextHover} onMouseOut={menuTextOut}>
                03.<br></br>
                Chat
              </li>
            </ul>
          </main>
          <footer className="footerArea">
            <div class="holder">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </footer>
        </article>
      </section>
    </>
  )
}

export default MainPage;