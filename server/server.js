const express = require("express"); //express 요청 
const app = express(); //express 사용을 위한 콜
const mysql = require("mysql"); //mysql 요청
const path = require("path"); //pat(경로)설정을 위한 path 요청
const bodyParser = require("body-parser"); //post 방식 사용을 위한 바디파서 요청
app.use(express.json()); //바디 파서 사용시 json 사용을 위함. 바디파서 필수 선언1
app.use(express.urlencoded({extended: true})); //바디파서 필수 선언2 
let dbCon = mysql.createConnection({ //mysql 연결 정보 기입
  host: "localhost",
  user: "root",
  password: "line5008@",
  database: "c16st12"
});

app.use(express.static(path.join(__dirname, "../build/"))); //static 폴더 작성
app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.post("/loginCheck", (req, res)=>{
  dbCon.connect((err)=>{ //mysql 연결
    let sqlStr = `select * from WARD_USER where w_id = "${req.body.id}"` ;
    dbCon.query(sqlStr, (err, result)=>{
      if(result.length != 0){
        if(result[0].w_pass == req.body.pass){
          res.send({
            check: "success",
            message: `${req.body.id}님 환영합니다.`
          });
        }else{
          res.send({
            check:"fail",
            message:"비밀번호가 일치하지 않습니다."
          });
        }
      }
      else{// 입력된 id 없는 경우
        res.send({
          check: "fail",
          message: "해당 아이디는 회원이 아닙니다."
        })
      }
    });
  });
});
app.post("/join", (req, res)=>{
  let data = [];
  for(let joinValue in req.body){
    if(req.body[joinValue] == ''){
      data.push(joinValue);
    };
  }
  if(data.length == 0){
    dbCon.connect(()=>{
      let sqlStr = "select * from WARD_USER where w_id = '"+req.body.joinId+"'";
      dbCon.query(sqlStr, (err, result)=>{
        if(result[0] == undefined){
          sqlStr = `insert into WARD_USER values(${null}, "${req.body.joinId}", "${req.body.joinPass}", "${req.body.joinName}", "${req.body.joinPhone}", "${req.body.joinEmail}")`;
          dbCon.query(sqlStr, (err, result)=>{
            res.send({
              check: "joinSuccess",
              message: "회원가입이 완료되었습니다."
            })
          });
        }else{
          res.send({
            check:"idUsed",
            message: "이미 사용중인 아이디입니다."
          });          
        };
      }); 
    });
  }
  else{
    res.send({
      check: "checkCont",
      message: "입력되지 않은 정보가 있습니다.",
      notInput: data
    });
  }
});
app.listen(3000, (err)=>{
  if(err) throw err;
  console.log("3000 port connect");
});