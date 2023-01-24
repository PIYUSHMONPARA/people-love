import 'font-awesome/css/font-awesome.min.css'
import { useState } from 'react'
const AuthenticationModel = ({setShowModel,isRegistration})  =>{
    const clickonDiv = ()=>{
        setShowModel(false)
    }
    const click_submit = (e)=>{
        e.preventDefault()
        try{
            if(isRegistration && (password !== conform_password)){
                setError('Password and conform passwod does not match!')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const [Student_email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [conform_password,setconform_password] = useState(null)
    const [error,setError] = useState(null)
    console.log(Student_email,password,conform_password)
    
    return (
        <div className="authentication-model">
            <div className='close-btn' onClick={clickonDiv}>
            <i className="fa fa-window-close"></i>
                </div>
            <h3>{isRegistration ? 'Sign Up' : 'LOGIN'}</h3>
            <p>By clicking on LOGIN you agree to our Privacy policy</p>
            <form onSubmit={click_submit}>
                <input type="email" id="Student_email" name="Student_email" placeholder='Your student email' required={true} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" name="password" placeholder='password' required={true} onChange={(e) => setPassword(e.target.value)}/>
                {isRegistration && <input type="password" id="conformpassword" name="conformpassword" placeholder='Conform password' required={true} onChange={(e) => setconform_password(e.target.value)}/>}
                <input type="submit" className='Submit_btn'/>
                <p>{error}</p>
            </form>
            <hr/>
            
        </div>
    )
}
export default AuthenticationModel