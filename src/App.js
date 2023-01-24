import Home from "./Pages/Home";
import Login from "./Pages/UserInfornation";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/UserInfornation" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
