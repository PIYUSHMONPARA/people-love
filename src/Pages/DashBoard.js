    import axios from "axios"
    import { useEffect,useState } from "react"
    import React, { Component }  from 'react';
    // import { useState } from "react"
    import TinderCard from "react-tinder-card" 
    import  ChatBox from '../Components/ChatBox'
    import { useCookies } from "react-cookie"
    import { update } from "@react-spring/web"
    const DashBoard = () =>{
    const [user,setUser] = useState(null)
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const [GenderProfile,setGenderProfile] = useState(null)
    const userid = cookie?.userid
      const getUser = async() =>{
        try{
          const responsce = await axios.get('http://localhost:8000/Cruser',{
            params:{userid}
          })
          setUser(responsce.data)
          // console.log('user',responsce.data);
        }catch(error){
          console.log(error)
        }
      }


      const GetProfileGenderWise = async() =>{
        try{
        const responsce =  await axios.get('http://localhost:8000/genderprofile',{
            params:{gender:user?.gender_interest}
          })
          setGenderProfile(responsce.data)
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() => {
        getUser()
        GetProfileGenderWise()
      },[getUser,GetProfileGenderWise])

      // console.log('users',user)
      // console.log('GenderProfile',GenderProfile)

        // const characters = [
        //     {
        //       name: 'Richard Hendricks',
        //       url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        //     },
        //     {
        //       name: 'Erlich Bachman',
        //       url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        //     },
        //     {
        //       name: 'Monica Hall',
        //       url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        //     },
        //     {
        //       name: 'Jared Dunn',
        //       url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        //     },
        //     {
        //       name: 'Dinesh Chugtai',
        //       url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        //     }
        //   ]
      const [lastDirection, setLastDirection] = useState()

      const updateMatches = async(MachedUser) =>{
        try{
          await axios.put('http://localhost:8000/add_new_Match',{
            userid,
            MachedUser
          })
        getUser()
        }catch(error){
          console.log(error)
        }
      }
    console.log(user)
      const swiped = (direction, swipedUserId) => {
        // console.log('removing: ' + nameToDelete)
        if(direction === 'right'){
          updateMatches(swipedUserId)
        }
        setLastDirection(direction)
      }

      const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
      }

      // const matchprofileid = user?.matches.map(({user_id}) => user_id).concat(userid)
      // const filteredProfiles = GenderProfile?.filter(
      //   GenderProfile => !matchprofileid.includes(GenderProfile.user_id)
      // )

      // const matchProfiles = user?.matches.map(({user_id}) => user_id).concat(userid)
      // const matchProfiles = user?.matches.map(({user_id}) => user_id).concat(userid)

      // const filtedProfiles = GenderProfile?.filter(
      //   genderprofile => !matchProfiles.includes(GenderProfile.user_id)
      // )
      

      const matchProfiles = user?.matches.map(({user_id}) => user_id).concat(userid);
      

const filtedProfiles = GenderProfile?.filter(
  genderprofile => !matchProfiles.includes(genderprofile.user_id)
);

        return (
          <>
          {user &&
            <div className="DashBoard">
                <ChatBox user={user}/>
                
                <div className="match_swipe_container">
                    <div className="main_card_container">
                    {filtedProfiles.map((character) =>
              <TinderCard className='swipe' key={character.firstname} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.firstname)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.firstname}</h3>
                </div>
              </TinderCard>
            )}
            <div className="Direction_Swipt">
                    {lastDirection ? <h4>You swiped {lastDirection}</h4> : <h4/>}
                </div>
                    </div>
                </div>
              
            </div>}
            </>
        )
    }
    export default DashBoard