import axios from "axios"
import { useEffect, useState } from "react"
const Display_All_Match = ({ matches,setclickProfile }) =>{
    const [UserMacheProfiles,setUserMacheProfiles] = useState(null)
    const matchProfiles = matches.map(({user_id}) => user_id)
    console.log(JSON.stringify(matchProfiles))
    const getmatches = async ()=>{
        
        try{
            // console.log("Hello")
           const response =  await axios.get('http://localhost:8000/users',{
                params:{userIds : JSON.stringify(matchProfiles)}
            })
            setUserMacheProfiles(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getmatches()
    },[])
    console.log(UserMacheProfiles)
    return (
        <div className="Display_All_Match_Container">
            {UserMacheProfiles?.map((match,_index) =>
            (
                <div key={{_index}} className="Image_class" onClick={() => setclickProfile(match)}>
                    <div className="Use_img">
                        <img src={match?.url} alt={match?.firstname + 'profile'}/>
                    </div>
                    <h4>{match?.firstname}</h4>
                </div>
            )
            )}
        </div>
    )
}
export default Display_All_Match