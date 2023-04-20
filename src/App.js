import Home from "./Pages/Home";
import Login from "./Pages/UserInfornation";
import DashBoard from "./Pages/DashBoard";
import { useCookies } from 'react-cookie'
import React, { Component }  from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  const [cookie,setCookie,removeCookie] = useCookies(['user'])
  const SecureKeyToekn = cookie.SecureKeyToekn
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<Home/>}/>
      {SecureKeyToekn && <Route path="/UserInfornation" element = {<Login/>}/>}
      {SecureKeyToekn && <Route path="/DashBoard" element = {<DashBoard/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
