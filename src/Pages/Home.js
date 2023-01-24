import NavigationBar from "../Components/NavigationBar";
import AuthenticationModel from "../Components/AuthenticationModel";
import { useState } from "react";   
const Home = ()  =>{
    const Authentication = false
    const [showModel,setShowModel] = useState()
    const [isRegistration, setRegistration] = useState(true)
    const loginclick = () => {
        console.log("Click");
        setShowModel(true)
        setRegistration(true)
    }
    return (
        <div className="UpperDiv">
        <NavigationBar Display_Logo={false} Authentication={Authentication} setShowModel={setShowModel} showModel={showModel} setRegistration={setRegistration}/>
        <div className="mainDiv">
            <h1 className="main-tital-tag">Connecting college hearts, one swipe at a time.</h1>
            <button className="loginbutton" onClick={loginclick}>
                {Authentication ? "Logout" : "Sign up"}
            </button>
            {showModel && (<AuthenticationModel setShowModel={setShowModel} isRegistration={isRegistration}/>)}
        </div>
        </div>
    )
}
export default Home