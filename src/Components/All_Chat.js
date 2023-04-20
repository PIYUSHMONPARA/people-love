import { useRef, useEffect } from 'react';

const All_Chat = ({ timewisemessage, user }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [timewisemessage]);

  return (
    <div className="All_Chat_Container" ref={containerRef}>
      {timewisemessage.map((message, _index) => (
        <div key={_index} className={`message_container ${message.from_userid === user?.user_id ? 'sender' : 'receiver'}`}>
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
        </div>
      ))}
    </div>
  );
};

export default All_Chat;