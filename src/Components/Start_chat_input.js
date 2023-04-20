import axios from "axios"
import { useState } from "react"
import { GiphyFetch } from '@giphy/js-fetch-api'

const Start_chat_input = (user,clickProfile,getuserIdforsender,getuserIdforreceiver) => {
  const [input_textarea, setinput_textarea] = useState(null)
  const [showGifs, setShowGifs] = useState(false)
  const giphyFetch = new GiphyFetch('YOUR_GIPHY_API_KEY')

  const userid = user?.user.user_id
  const clickprofile = user?.clickProfile.user_id

  const handleGifSelect = async (gif) => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userid: userid,
      to_user: clickprofile,
      message: gif.url
    }
    try {
      await axios.post('http://localhost:8000/addMessage', { message })
      user?.getuserIdforsender()
      user?.getuserIdforreceiver()
      setinput_textarea('')
    } catch (error) {
      console.log(error)
    }
    setShowGifs(false)
  }

  return (
    <div className="Start_chat_input_Container">
      <textarea value={input_textarea} className="txtinputchat" onChange={(e) => setinput_textarea(e.target.value)} />
      <button className="loginbutton" >Send</button>
      <button className="gifbutton" onClick={() => setShowGifs(true)}>GIFs</button>
      {showGifs && (
        <div className="gif-container">
          <input type="text" onChange={(e) => giphyFetch.search(e.target.value, { limit: 10 })} />
          <div className="gif-results">
            {giphyFetch.searchResults?.map((gif) => (
              <img key={gif.id} src={gif.url} onClick={() => handleGifSelect(gif)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Start_chat_input