import { useState } from "react"
const Start_chat_input = () =>{
    const [input_textarea,setinput_textarea] = useState(null)
    return (
      <div className="Start_chat_input_Container">
        <textarea value={input_textarea} className="txtinputchat" onChange={(e) => setinput_textarea(e.target.value)}/>
        <button className="loginbutton">Send</button>
      </div>
        )
}
export default Start_chat_input