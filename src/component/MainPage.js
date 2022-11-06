import React, { useState } from "react";
import "./css/mainPage.css";
import axios, { Axios } from "axios";
import $ from "jquery";
const intro = ()=>{
  $(".stick:nth-child(odd)").css({"transform":"translateY(-150vh)"});
  $(".stick:nth-child(even)").css({"transform":"translateY(150vh)"});
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
            
          </main>
          <footer className="footerArea">

          </footer>
        </article>
      </section>
    </>
  )
}

export default MainPage;