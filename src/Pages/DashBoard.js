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
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const userid = cookie?.userid

  const getUser = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/Cruser?userid=${userid}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProfileGenderWise = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/genderprofile?gender=${user?.gender_interest}`)
      const filteredByAge = response.data.filter(profile => {
        const age = new Date().getFullYear() - new Date(profile.date_of_birth_year, profile.date_of_birth_month - 1, profile.date_of_birth_day).getFullYear()
        const minAge = user?.min_age_preference || 18
        const maxAge = user?.max_age_preference || 99
        return age >= minAge && age <= maxAge
      })
      setGenderProfile(filteredByAge)
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
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  useEffect(() => {
    getUser()
    getProfileGenderWise()
  },[getUser,getProfileGenderWise])

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
                  {/* <div className="flip-card-back">
                    <h1>John Doe</h1> 
                    <p>Architect & Engineer</p> 
                    <p>We love that guy</p>
                </div> */}
                </TinderCard>
              ))}
            </div>
            {lastDirection && <h4>You swiped {lastDirection}</h4>}
          </div>
        </div>
      }
    </>
  )
}

export default DashBoard