import './App.css';
import { ReactDOM } from 'react-dom/client';
import LoginPage from './component/LoginPage';
import MainPage from './component/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //라우팅을 위함
let firstIntro = true;
function App() {
  
  return (
    <BrowserRouter> {/* 라우팅을 위한 브라우저라우터 : 안에있는 라우트들 라우팅*/}
      <div className="App">
        <Routes> {/** 라우팅 하려는 라우트들 감쌈 */}
          <Route path='/' element={<LoginPage></LoginPage>}></Route> 
          {/** 라우트 형태*/}
          <Route path='/main' element={<MainPage></MainPage>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    // <LoginPage></LoginPage>

  );
}

export default App;
