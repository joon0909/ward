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
        console.log(response.data)
        $(".loginFailMessage").css({"display":"flex"});
        setTimeout(()=>{
          $(".loginFailMessage").css({"display":"none"});
        }, 1000)
      }
    });
  }
  const phoneNumCheck = (e)=>{
    console.log(typeof parseInt(e.key))
    console.log(parseInt(e.key))
     
    if(!(0<=parseInt(e.key) && parseInt(e.key)<=9)){
      $("#joinPhone").val("");
    }
  }
  const tabMenuClick = (e)=>{
    $(".tabMenu").removeClass("selectFindTab");
    switch(e.target.id){
      case "findIdTab":
        $("#findIdTab").addClass("selectFindTab");
        $(".findIdForm").css({"display":"flex"});
        $(".findPassForm").css({"display":"none"});
        break;
      case "findPassTab":
        $("#findPassTab").addClass("selectFindTab"); 
        $(".findPassForm").css({"display":"flex"});
        $(".findIdForm").css({"display":"none"});
        break;
      default:
        break;
    }
  }
  const findIdSubmit = (e)=>{
    e.preventDefault();
    let body = {
      findName : $(".findIdForm #findName").val(),
      findEmail : $(".findIdForm #findEmail").val()
    }
    console.log(body)
    axios({
      url:"/findId",
      method:"post",
      data:body
    }).then((response)=>{
      console.log(response.data)
      switch(response.data.check){
        case "findfail":
          $(".findFailText").text(response.data.message);
          $(".findFailMessage").css("display", "flex");
          break;
        case "notuser":
          $(".findFailText").text(response.data.message);
          $(".findFailMessage").css("display", "flex");
          break;
        case "findsuccess":
          $(".findFailText").text("ID : "+response.data.result['userId']);
          $(".findFailMessage").css("display", "flex");
          break;
        default:
          break;
      }
    });
  }
  const findPassSubmit = (e)=>{
    e.preventDefault();
    let body = {
      findId : $(".findPassForm #findId").val(),
      findName : $(".findPassForm #findName").val(),
      findEmail : $(".findPassForm #findEmail").val()
    }
    axios({
      url:"/findPass",
      method:"post",
      data:body
    }).then((response)=>{
      console.log(response.data);
      switch(response.data.check){
        case "findfail":
          $(".findFailText").text(response.data.message);
          $(".findFailMessage").css("display", "flex");
          break;
        case "notuser":
          $(".findFailText").text(response.data.message);
          $(".findFailMessage").css("display", "flex");
          break;
        case "findsuccess":
          $(".findFailText").text("PASS : "+response.data.result['userPass']);
          $(".findFailMessage").css("display", "flex");
          break;
        default:
          break;
      } 
    });
  }
  const joinSubmit = (e)=>{
    e.preventDefault();
    console.log($("#joinId").val());
    let body = {
      joinId : $("#joinId").val(),
      joinPass : $("#joinPass").val(),
      joinName : $("#joinName").val(),
      joinPhone : $("#joinPhone").val(),
      joinEmail : $("#joinEmail").val()
    };
    axios({
      url: "/join",
      method: "post",
      data: body
    }).then((response)=>{
      console.log(response.data)
      switch(response.data.check){
        case "checkCont":
          response.data["notInput"].forEach((v)=>{
            $(`#${v}`).css({"border":"0.2rem solid crimson", "box-shadow":"inset 0 0 0 0.2rem crimson"});
            let tossV = v;
            setTimeout(()=>{
              $(`#${tossV}`).css({"border":"0.2rem solid #111", "box-shadow":"0 0 0 0 white"});
            }, 3000);
          });
          break;
        case "idUsed":
          $(".joinArea").append("<div class='usedIdMessage'><p>이미 사용중인 아이디입니다.</p></div>");
          setTimeout(()=>{
            $(".usedIdMessage").remove();
          }, 2000);
          break;
        case "joinSuccess":
          $(".joinArea").append("<div class='joinMessage'><p>회원가입에 성공하였습니다.</p></div>");
          setTimeout(()=>{
            $(".joinMessage").remove();
            backMain();
          }, 2000); 
          break;
        default:
          break;    
      }
    });
  }
  const joinClick = (e)=>{
    $(".joinArea").css({"transform":"translateX(0)"});
  }
  const findClick = (e)=>{
    $(".findArea").css({"transform":"translateX(0)"});
  }
  const backMain = (e)=>{
    $(".joinArea").css({"transform":"translateX(100%)"});
  }
  const findBack = (e)=>{
    $(".findArea").css({"transform":"translateX(-100%)"});
  }
  const findExit = (e)=>{
    $(".findFailMessage").css("display", "none");
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
              <label className="inputIdLabel" htmlFor="loginInputId">ID<h6>(sampleID:master)</h6></label>
              <input id="loginInputId" type="text" name="inputId" maxLength="8" autoComplete="off" value={inputId} onChange={onInputIdHandler}></input>
              <label className="inputPassLabel" htmlFor="loginInputPass">PASS<h6>(samplePASS:1234)</h6></label>
              <input id="loginInputPass" type="password" name="inputPass" maxLength="8" value={inputPass} onChange={onInputPassHandler}></input>
              <button className="loginSubmit" type="submit">Login</button>
            </div>
            <div className="buttonArea">
              <div className="joinButton" onClick={joinClick}>회원가입</div>
              <div className="findButton" onClick={findClick}>회원정보 찾기</div>
            </div>
          </form>
        </article>
        <article className="loginFailMessage">
          <p>입력된 회원 정보에 일치하는 회원이 없습니다.</p>
        </article>
        <article className="joinArea">
          <div className="backIcon" onClick={backMain}></div>
          <form className="joinForm" onSubmit={joinSubmit}>
            <h1>WARD</h1>
            <div className="joinBox">
              <label for="joinId">ID</label>
              <input type="text" maxLength="8" minlength="4" id="joinId" autoComplete="0"></input>
            </div>
            <div className="joinBox">
              <label for="joinPass">PASS</label>
              <input type="password" maxLength="8" minlength="4" id="joinPass" autoComplete="0"></input>
            </div>
            <div className="joinBox">
              <label for="joinName">이름</label>
              <input type="text" id="joinName" autoComplete="0"></input>
            </div>
            <div className="joinBox">
              <label for="joinPhone">휴대전화</label>
              <input type="text" id="joinPhone" maxLength="11" autoComplete="0" onKeyUp={phoneNumCheck}></input>
            </div>
            <div className="joinBox">
              <label for="joinEmail">이메일</label>
              <input type="text" id="joinEmail" autoComplete="0"></input>
            </div>
            <button className="joinButton" onClick={joinSubmit}>회원가입</button>
          </form>
        </article>
        <article className="findFailMessage">
          <p className="findFailText"></p>
          <div className="findExit" onClick={findExit}>확인</div>
        </article>
        <article className="findArea">
          <div className="findBackIcon" onClick={findBack}></div>
          <div className="findCont">
            <div className="findTabMenu">
              <div id="findIdTab" className="tabMenu selectFindTab" onClick={tabMenuClick}>아이디 찾기</div>
              <div id="findPassTab" className="tabMenu" onClick={tabMenuClick}>비밀번호 찾기</div>
            </div>
            <form className="findIdForm" onSubmit={findIdSubmit}>
              <div className="findBox">
                <label for="findName">이름</label>
                <input type="text" id="findName" autoComplete="0"></input>
              </div> 
              <div className="findBox">
                <label for="findEmail">이메일</label>
                <input type="text" id="findEmail" autoComplete="0"></input>
              </div> 
              <div className="findIdSubmit" onClick={findIdSubmit}>
                아이디 찾기
              </div>
            </form>
            <form className="findPassForm" onSubmit={findPassSubmit}>
              <div className="findBox">
                <label for="findId">ID</label>
                <input type="text" maxLength="8" minlength="4" id="findId" autoComplete="0"></input>
              </div>
              <div className="findBox">
                <label for="findName">이름</label>
                <input type="text" id="findName" autoComplete="0"></input>
              </div> 
              <div className="findBox">
                <label for="findEmail">이메일</label>
                <input type="text" id="findEmail" autoComplete="0"></input>
              </div> 
              <div className="findPassSubmit" onClick={findPassSubmit}>
                비밀번호 찾기
              </div> 
            </form>
          </div>
        </article>
      </section>
    </>
  );
}
export default LoginPage;