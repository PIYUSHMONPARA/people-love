import  ChatBoxTitle from '../Components/ChatBoxTitle'
import Display_All_Match from '../Components/Display_All_Match'
import Display_All_Chat from '../Components/Display_All_Chat'
const CharBox = () =>{
    
    return (
        <div className="chatBox_Container">
            <ChatBoxTitle/>
            <div>
                <button className="StartChat">Match</button>
                <button className="StartChat">Chat</button>
            </div>
                <Display_All_Match/>
                <Display_All_Chat/>
        </div>
    )
}
export default CharBox