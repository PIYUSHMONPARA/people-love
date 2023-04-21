import { useRef, useEffect } from 'react';
import axios from 'axios';

const All_Chat = ({ timewisemessage, user }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSeenValue = async () => {
      // Loop through the messages and check if the message is from the current user
      for (let i = 0; i < timewisemessage.length; i++) {
        const message = timewisemessage[i];
        if (message.from_userid !== user.user_id) {
          continue;
        }

        // Check if the message has been seen
        if (message.seen) {
          continue;
        }
        console.log(message._id);
        // Update the seen value in the database
        try {
          await axios.patch(`http://localhost:8000/messagesseen/${message._id}`, {
            seen: true,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateSeenValue();
  }, [timewisemessage, user.user_id]);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [timewisemessage]);

  return (
    <div className="All_Chat_Container" ref={containerRef}>
      {timewisemessage.map((message, index) => (
        <div key={index} className={`message_container ${message.from_userid === user.user_id ? 'sender' : 'receiver'}`}>
          <div className="message_title">
            <div className="Use_img">
              <img src={message.Image} alt={message.Firstname} />
            </div>  
            <p>{message.Firstname}</p>
          </div>
          {message.message.includes('giphy.com/embed') ? (
            <iframe src={message.message} width="180" height="90" className="giphy-embed" allowFullScreen></iframe>
          ) : (
            <p>{message.message}</p>
          )}
          {message.seen && (
            <span className="seen_indicator">✓</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default All_Chat;