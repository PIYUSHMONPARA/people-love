import { useCookies } from 'react-cookie'
const ChatBoxTitle = (user) =>{
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const logout = () => {
        const { userid, SecureKeyToekn, Student_email } = cookie;
        removeCookie('userid', userid);
        removeCookie('SecureKeyToekn', SecureKeyToekn);
        removeCookie('Student_email', Student_email);
        window.location.href = '/';
      };

    return (
        <div className="ChatBoxTitle_Container">
            <div className="Image_class">
                <div className="Use_img">
                <img src={user.url} alt={user.firstname}/>
                </div>
                <h4>{user.firstname}</h4>
            </div>
            <i className="fa fa-sign-out" onClick={logout}></i>
        </div>
    )
}
export default ChatBoxTitle