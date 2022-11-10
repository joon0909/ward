const express = require("express"); //express 요청 
const app = express(); //express 사용을 위한 콜
const mysql = require("mysql"); //mysql 요청
const path = require("path"); //pat(경로)설정을 위한 path 요청
const bodyParser = require("body-parser"); //post 방식 사용을 위한 바디파서 요청
const cookieParser = require("cookie-parser");
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
          //여기 쿠키 넘기기
          res.cookie('ward_cookie', {
            userId: result[0].w_id
          }, {maxAge: (1000 * 60 * 60)});
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
app.post("/findId", (req, res)=>{
  if(req.body['findName'].length == 0 || req.body['findEmail'].length == 0){
    let emptyKey = [];
    for(let key in req.body){
      if(req.body[key].length == 0){
        emptyKey.push(key);
      }
    }
    res.send({
      check: "findfail",
      message: "입력되지 않은 데이터가 있습니다."
    });
  }
  else{
    let sqlStr = "select w_id from WARD_USER where w_name ='" + req.body['findName'] + "' and w_email = '" + req.body['findEmail']+"'";
    dbCon.query(sqlStr, (err, result)=>{
      console.log(result.length);
      if(result.length >= 1){
        res.send({
          check: "findsuccess",
          message: "정보 조회 성공",
          result: {
            userId: result[0].w_id
          }
        });
      }
      else{
        res.send({
          check: "notuser",
          message: "입력한 정보와 일치하는 회원이 없습니다."
        });
      }
    });
  }
});
app.post("/findPass", (req, res)=>{
  if(req.body['findName'].length == 0 || req.body['findEmail'].length == 0 || req.body['findId'].length == 0){
    let emptyKey = [];
    for(let key in req.body){
      if(req.body[key].length == 0){
        emptyKey.push(key);
      }
    }
    res.send({
      check: "findfail",
      message: "입력되지 않은 데이터가 있습니다."
    });
  }
  else{
    let sqlStr = "select w_pass from WARD_USER where w_name ='" + req.body['findName'] + "' and w_email = '" + req.body['findEmail']+"' and w_id = '"+req.body['findId']+"'";
    dbCon.query(sqlStr, (err, result)=>{
      console.log(result.length);
      if(result.length >= 1){
        res.send({
          check: "findsuccess",
          message: "정보 조회 성공",
          result: {
            userPass: result[0].w_pass
          }
        });
      }
      else{
        res.send({
          check: "notuser",
          message: "입력한 정보와 일치하는 회원이 없습니다."
        });
      }
    });
  } 
});
app.post("/postList", (req, res)=>{
  let sqlStr = `select * from WARD_FRIEND where wf_user = "${req.body.userId}"`;
  dbCon.query(sqlStr, (err, result)=>{
    let friendArr = [];
    result.forEach((v, i, a)=>{
      friendArr.push(v.wf_target);
    });
    let tempStr = `'${req.body.userId}', `;
    friendArr.forEach((v, i, a)=>{
      if(i == friendArr.length-1){
        tempStr+="'"+v+"'";
      }else{
        tempStr+="'"+v+"', ";
      }
    });
    sqlStr = `select * from WARD_POST where wp_writer in (${tempStr})`;
    dbCon.query(sqlStr, (err, result)=>{
      res.send({
        friendData: result
      });
    });
  });
})
app.listen(3000, (err)=>{
  if(err) throw err;
  console.log("3000 port connect");
});
