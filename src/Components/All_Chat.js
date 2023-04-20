const All_Chat = ({ timewisemessage, user }) => {
  console.log('timewisemessage:', timewisemessage);
  return (
    <>
      <div className="All_Chat_Container">
        {timewisemessage.map((message, _index) => (
          <div key={_index} className={`message_container ${message.from_userid === user?.user_id ? 'sender' : 'receiver'}`}>
            <div className="message_title">
              <div className="Use_img">
                <img src={message.Image} alt={message.Firstname} />
              </div>  
              <p>{message.Firstname}</p>
            </div>
            {/* <iframe src="https://giphy.com/embed/x2q1yFqQGPwLKnGwjT" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
            {message.message.includes('giphy.com/embed') ? (
              <img src={message.message} alt="gif" />
              // <iframe src={message.message} width="240" height="180" class="giphy-embed" allowFullScreen></iframe>
            ) : (
              <p>{message.message}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default All_Chat