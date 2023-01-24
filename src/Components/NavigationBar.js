import colorlogo from '../Images/People-Love-logos_transparent.png'
import whiteLogo from '../Images/People-Love-logos_white.png'

const NavigationBar = ({Display_Logo,Authentication,setShowModel,showModel,setRegistration})=>{
    const fun_login = () =>
    {
        setShowModel(true)
        setRegistration(false)
    }
    return (
        <nav>
            <div className="logo_div">
                <img className="img_logo" src={Display_Logo ? colorlogo : whiteLogo}/>
            </div>
            {!Authentication && <button className="nav-button" onClick={fun_login} disabled={showModel}>Sign In</button>}
        </nav>
    )
}
export default NavigationBar