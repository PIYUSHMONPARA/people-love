import  ChatBoxTitle from '../Components/ChatBoxTitle'
import Display_All_Match from '../Components/Display_All_Match'
import Display_All_Chat from '../Components/Display_All_Chat'
import { useState } from 'react'
const CharBox = ({user}) =>{
    console.log('newuser' + user.matches)
    const [clickProfile,setclickProfile] = useState(null)
    return (
        <div className="chatBox_Container">
            <ChatBoxTitle/>
            <div>
                <button className="StartChat" onClick={()=> setclickProfile(null)}>Match</button>
                <button className="StartChat" disabled={!clickProfile}>Chat</button>
            </div>
                {!clickProfile && <Display_All_Match matches={user.matches} setclickProfile={setclickProfile}/>}
                {clickProfile && <Display_All_Chat user={user} clickProfile={clickProfile}/>}
                
        </div>
    )
}
export default CharBox