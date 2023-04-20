import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import React, { Component }  from 'react';
// import { useNavigate } from 'react-router'
const AuthenticationModel = ({setShowModel,isRegistration})  =>{
    const clickonDiv = ()=>{
        setShowModel(false)
    }
    <script src=''></script>
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const [Student_email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [conform_password,setconform_password] = useState(null)
    const [error,setError] = useState(null)
    console.log(Student_email,password,conform_password)
    const click_submit = async (e)=>{
        e.preventDefault()
        try{
            if(isRegistration && (password !== conform_password)){
                setError('Password and conform passwod does not match!')
                return
            }
                const responsce = await axios.post(`http://localhost:8000/${isRegistration ? 'signup' : 'login'}`,{Student_email,password})
                const success = responsce.status === 201
                setCookie('Student_email',responsce.data.Student_email)
                setCookie('userid',responsce.data.userid)
                setCookie('SecureKeyToekn',responsce.data.SecureKeyToekn)
                if(success && isRegistration) navigation ('/UserInfornation')
                if(success && !isRegistration) navigation ('/DashBoard')
                window.location.reload()
        }       
        catch(error){
            console.log(error)
        }
    }
    return (
        <div className="authentication-model">
            <div className='close-btn' onClick={clickonDiv}>
            <i className="fa fa-window-close"></i>
                </div>
            <h3>{isRegistration ? 'Sign Up' : 'LOGIN'}</h3>
            <p>By clicking on Submit you agree to our Privacy policy</p>
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