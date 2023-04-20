import axios from "axios";
import { useState } from "react";
import { GiphyFetch } from '@giphy/js-fetch-api';

const Start_chat_input = (user, clickProfile, getuserIdforsender, getuserIdforreceiver) => {
  const [input_textarea, setinput_textarea] = useState(null);
  const [showGifs, setShowGifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const giphyFetch = new GiphyFetch('Ji98QF9bvkN8DfVwXGcLSP98b2RlQNpQ');
// People love API key
//Ji98QF9bvkN8DfVwXGcLSP98b2RlQNpQ   	 	
  const userid = user?.user.user_id;
  const clickprofile = user?.clickProfile.user_id;

  const handleGifSelect = async (gif) => {
    console.log(gif);
    const message = {
      timestamp: new Date().toISOString(),
      from_userid: userid,
      to_user: clickprofile,
      message: gif.embed_url
    }
    try {
      await axios.post('http://localhost:8000/addMessage', { message });
      user?.getuserIdforsender();
      user?.getuserIdforreceiver();
      setinput_textarea('');
    } catch (error) {
      console.log(error);
    }
    setShowGifs(false);
  }

  const sendMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userid: userid,
      to_user: clickprofile,
      message: input_textarea
    }
    try {
      await axios.post('http://localhost:8000/addMessage', { message });
      user?.getuserIdforsender();
      user?.getuserIdforreceiver();
      setinput_textarea('');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const result = await giphyFetch.search(query, { limit: 10 });
      setSearchResults(result.data);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    }
  }

  return (
    <div className="Start_chat_input_Container">
      <textarea value={input_textarea} className="txtinputchat" onChange={(e) => setinput_textarea(e.target.value)} />
      <button className="loginbutton" onClick={() => sendMessage()}>Send</button>
      <button className="gifbutton" onClick={() => setShowGifs(true)}>GIFs</button>
      {showGifs && (
        <div className="gif-container">
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
          <div className="gif-results">
            {searchResults.map((gif) => (
              <img key={gif.id} src={gif.images.fixed_width.url} onClick={() => handleGifSelect(gif)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Start_chat_input;