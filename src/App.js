import Home from "./Pages/Home";
import Login from "./Pages/UserInfornation";
import DashBoard from "./Pages/DashBoard";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/UserInfornation" element = {<Login/>}/>
      <Route path="/DashBoard" element = {<DashBoard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
