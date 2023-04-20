import axios from 'axios'
import { useEffect, useState } from 'react'
import All_Chat from '../Components/All_Chat'
import Start_chat_input from '../Components/Start_chat_input'

const Display_All_Chat = ({ user, clickProfile }) => {
  const [UserMessagesForChat, setUserMessagesForChat] = useState(null)
  const [ClickedUserMessagesForChat, setClickedUserMessagesForChat] = useState(null)
  const userid = user?.user_id
  const clickProfileUserid = clickProfile?.user_id

  
  const getuserIdforsender = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userid : userid, receiverduserid: clickProfileUserid }
      })
      setUserMessagesForChat(response.data)
    //   console.log("Messahe Responce" + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getuserIdforreceiver = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userid : clickProfileUserid, receiverduserid: userid }
      })
      setClickedUserMessagesForChat(response.data)
    //   console.log("Messahe Responce" + response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getuserIdforsender()
    getuserIdforreceiver()
  }, [])
  
//   console.log(UserMessagesForChat)

const user_Messages = []

UserMessagesForChat?.forEach(user_Message => {
  const formate_Mesage = {}
  formate_Mesage['Firstname'] = user?.firstname
  formate_Mesage['Image'] = user?.url
  formate_Mesage['message'] = user_Message?.message
  formate_Mesage['timestamp'] = user_Message?.timestamp
  user_Messages.push(formate_Mesage)
})

ClickedUserMessagesForChat?.forEach(user_Message => {
    const formate_Mesage = {}
    formate_Mesage['Firstname'] = clickProfile?.firstname
    formate_Mesage['Image'] = clickProfile?.url
    formate_Mesage['message'] = user_Message?.message
    formate_Mesage['timestamp'] = user_Message?.timestamp
    user_Messages.push(formate_Mesage)
  })
const timewisemessage = user_Messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
console.log('timewisemessage:', timewisemessage);


// console.log(UserMessagesForChat)
// console.log(ClickedUserMessagesForChat)
  return (
    <>
      <All_Chat timewisemessage={timewisemessage} user = {user}/>
      {/* {console.log('user.user_id ' + user.user_id +' clickProfile.user_id ' + clickProfile.user_id)} */}
      <Start_chat_input user={user} clickProfile = {clickProfile} getuserIdforsender = {getuserIdforsender} getuserIdforreceiver= {getuserIdforreceiver}/>
    </>
  )
}

export default Display_All_Chat