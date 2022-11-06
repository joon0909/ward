import React, { useState } from "react";
import "./css/loginPage.css";
import axios, { Axios } from "axios"; //비동기 처리를 위한 axios
import $ from "jquery"; //jquery 사용을 위함
import {useNavigate} from "react-router-dom"; 
//useHistory가  useNavigate로 변경됨 / location.href 대용. 새로고침 없이 이동
const intro = ()=>{
    setTimeout(()=>{
      $(".hiddenBox1").css("width", "0%");
      setTimeout(()=>{
        $(".loginArea").css({"width":"100%", "height":"100%", "border-radius":"0", "color":"black", "background-color":"white"});
        $(".hiddenBox1").css("background-color","white");
        setTimeout(()=>{
          $(".loginForm").css({"width":"40%", "background-color":"#111", "opacity":"1"});
        }, 500);
      }, 500);
    }, 500);
};
const LoginPage = (props)=>{
  const navigate = useNavigate(); // 네비게이터 사용을 위한 콜.()
  intro();
  const onInputIdHandler = (e)=>{
    setInputId(e.currentTarget.value);
  }
  const onInputPassHandler = (e)=>{
    setInputPass(e.currentTarget.value);
  }
  let [inputId, setInputId] = useState("");
  let [inputPass, setInputPass] = useState("");
  const loginSubmit = (e)=>{
    e.preventDefault();
    let body = {
      id: inputId,
      pass: inputPass
    }
    axios({
      method: 'post',
      url: '/loginCheck',
      data: body
    }).then(response=>{
      if(response.data.check == "success"){
        // window.location.href = "/main";
        navigate("/main"); //네비게이터 사용
      }else{
        //
        console.log(response.data)
      }
    });
  }
  return (
    <>
      <section className="loginPage">
        <article className="loginArea">
          WARD
          <div className="hiddenBox1"></div>
          <form className="loginForm" onSubmit={loginSubmit}>
            <h1 className="loginTitle">WARD</h1>
            <div className="inputArea">
              <label className="inputIdLabel" htmlFor="loginInputId">ID</label>
              <input id="loginInputId" type="text" name="inputId" maxLength="8" autoComplete="off" value={inputId} onChange={onInputIdHandler}></input>
              <label className="inputPassLabel" htmlFor="loginInputPass">PASS</label>
              <input id="loginInputPass" type="password" name="inputPass" maxLength="8" value={inputPass} onChange={onInputPassHandler}></input>
              <button className="loginSubmit" type="submit">Login</button>
            </div>
            <div className="buttonArea">
              <div className="joinButton">회원가입</div>
              <div className="findButton">회원정보 찾기</div>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}
export default LoginPage;