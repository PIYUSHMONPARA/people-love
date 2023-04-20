import axios from "axios"
import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card" 
import ChatBox from '../Components/ChatBox'
import { useCookies } from "react-cookie"

const DashBoard = () => {
  const [user, setUser] = useState(null)
  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [genderProfile, setGenderProfile] = useState(null)
  const [lastDirection, setLastDirection] = useState()

  const userid = cookie?.userid

  const getUser = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/Cruser?userid=${userid}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const GetProfileGenderWise = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/genderprofile?gender=${user?.gender_interest}`)
      setGenderProfile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateMatches = async(matchedUser) => {
    try {
      await axios.put('http://localhost:8000/add_new_Match', {
        userid,
        matchedUser
      })
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  const swiped = (direction, swipedUser) => {
    if (direction === 'right') {
      updateMatches(swipedUser)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  useEffect(() => {
    getUser()
    GetProfileGenderWise()
  },[getUser,GetProfileGenderWise])


  const matchedUserIds = user?.matches?.map(({user_id}) => user_id).concat(userid) || []
  const filteredProfiles = genderProfile?.filter(profile => !matchedUserIds.includes(profile.user_id)) || []

  return (
    <>
      {user &&
        <div className="DashBoard">
          <ChatBox user={user}/>
          <div className="match_swipe_container">
            <div className="main_card_container">
              {filteredProfiles.map((profile) => (
                <TinderCard
                  className='swipe'
                  key={profile.firstname}
                  onSwipe={(dir) => swiped(dir, profile.user_id)}
                  onCardLeftScreen={() => outOfFrame(profile.firstname)}
                >
                  <div style={{ backgroundImage: `url(${profile.url})` }} className='card'>
                    <h3>{profile.firstname}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
            {lastDirection ? <h4>You swiped {lastDirection}</h4> : <h4/>}
          </div>
        </div>
      }
    </>
  )
}

export default DashBoard