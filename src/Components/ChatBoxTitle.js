import { useCookies } from 'react-cookie'
const ChatBoxTitle = (user) =>{
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const logout = () =>{
        removeCookie('userid',cookie.userid)
        removeCookie('SecureKeyToekn',cookie.SecureKeyToekn)
        removeCookie('Student_email',cookie.Student_email)
        window.location.reload()
    }

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