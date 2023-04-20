const All_Chat = ({timewisemessage,user}) =>{
    return (
      <>
      <div className="All_Chat_Container">
          {timewisemessage.map((message, _index) => (
            // <div key={_index}>
            <div key={_index} className={`message_container ${message.from_userid === user?.user_id ? 'sender' : 'receiver'}`}>
              <div className="message_title">
                <div className="Use_img">
                  {console.log('message.img' + message.img)}
                  <img src={message.img} alt={message.firstname}/>
                </div>
                <p>{message.name}</p>
              </div>
              <p>{message.message}</p>
            </div>

          ))}
      </div>
      </>
        )
}
export default All_Chat