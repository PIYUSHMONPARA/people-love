import { useState } from "react"
import NavigationBar from "../Components/NavigationBar"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const UserInfornation = () => {
    const navigation = useNavigate();
    const click_register = async(e) => {
        e.preventDefault()
        try{
            const resp =  await axios.put('http://localhost:8000/updateuser',{forminputdata})
            const issuccess = resp.status === 200
            if(issuccess) navigation ('/DashBoard')
            console.log('hello piyush')
        }catch(error){
            console.log(error)
        }
    }

    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const [forminputdata, setForminputdata] = useState({
        user_id : cookie.userid,
        firstname : '',
        LastName : '',
        date_of_birth_day : '',
        date_of_birth_month : '',
        date_of_birth_year : '',
        display_Gender : true,
        user_Gender : 'Male',
        Gender_Interested : 'Female',
        // email : cookie,
        image_url : '',
        about : '',
        matches :[]
    })
    
    const inputChange = (e) => {
       // console.log('e',e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        // console.log(value,name)
        setForminputdata((prevState) => ({
        ...prevState,
        [name] : value
     }))
    }
    console.log(forminputdata)
    return ( 
        <>
            <NavigationBar Display_Logo={true} setShowModel={() => { }} showModel={false} />
            <div className="UserInfornation">
                <h2>CREATE ACCOUNT</h2>
                <form onSubmit={click_register}>
                    <section>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" name="firstname" placeholder="First Name" required={true} onChange={inputChange} value={forminputdata.FirstName} />

                        <label htmlFor="LastName">Last Name</label>
                        <input id="LastName" type="text" name="LastName" placeholder="Last Name" value={forminputdata.LastName} onChange={inputChange} />
                        <div className="All_input_Container">
                            <label htmlFor="date_of_birth_day">DOB</label>
                            <input id="date_of_birth_day" type="number" name="date_of_birth_day" placeholder="DD" value={forminputdata.date_of_birth_day} onChange={inputChange} />

                            <input id="date_of_birth_month" type="number" name="date_of_birth_month" placeholder="MM" value={forminputdata.date_of_birth_month} onChange={inputChange} />

                            <input id="date_of_birth_year" type="number" name="date_of_birth_year" placeholder="YYYY" value={forminputdata.date_of_birth_year} onChange={inputChange} />
                        </div>

                        <label htmlFor="user_Gender">Gender</label>
                        <div className="All_input_Container">
                        <input id="Male" type="radio" name="user_Gender" value="Male" onChange={inputChange} checked={forminputdata.user_Gender === 'Male'} />
                        <label htmlFor="Male">Male</label>
                        <input id="Female" type="radio" name="user_Gender" value="Female" onChange={inputChange} checked={forminputdata.user_Gender === 'Female'} />
                        <label htmlFor="Female">Female</label>
                        <input id="Other" type="radio" name="user_Gender" value="Other" onChange={inputChange} checked={forminputdata.user_Gender === 'Other'} />
                        <label htmlFor="Other">Other</label>
                        </div>
                        <label htmlFor="display_Gender">Display Gender</label>
                        <input id="display_Gender" type="checkbox" name="display_Gender" onChange={inputChange} checked={forminputdata.display_Gender} />

                        <label htmlFor="Gender_Interest">Interested In</label>
                        <div className="All_input_Container">
                            
                            <input id="Male_Interested" type="radio" name="Gender_Interested" value="Male" onChange={inputChange} checked={forminputdata.Gender_Interested === 'Male'} />
                            <label htmlFor="Male_Interested">Male</label>
                            
                            <input id="Female_Interested" type="radio" name="Gender_Interested" value="Female" onChange={inputChange} checked={forminputdata.Gender_Interested === 'Female'} />
                            <label htmlFor="Female_Interested">Female</label>
                            
                            <input id="Other_Interested" type="radio" name="Gender_Interested" value="other" onChange={inputChange} checked={forminputdata.Gender_Interested === 'other'} />
                            <label htmlFor="Other_Interested">Other</label>
                        </div>
                        <label htmlFor="about">About</label>
                        {/* <input  type="textarea" id="About" name="About" placeholder="" onChange={inputChange} value={""}/> */}
                        <input type="text" id="about" name="about" placeholder="whatever you like.." onChange={inputChange} value={forminputdata.about} />
                        <input type="submit" />
                    </section>
                    <section>
                        <label htmlFor="url">Profile Image</label>
                        <input type="url" name="image_url" id="image_url" onChange={inputChange} required={true} />
                        <div className="image-container">
                         { forminputdata.image_url && <img src={forminputdata.image_url} alt="Profile" />}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}
export default UserInfornation