import { useState } from "react"
import TinderCard from "react-tinder-card" 
import  ChatBox from '../Components/ChatBox'
const DashBoard = () =>{
    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        },
        {
          name: 'Monica Hall',
          url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        },
        {
          name: 'Jared Dunn',
          url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://www.allaboutbirds.org/guide/assets/photo/297902651-1280px.jpg'
        }
      ]
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
    return (
        <div className="DashBoard">
            <ChatBox/>
            <div className="match_swipe_container">
                <div className="main_card_container">
                {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
         <div className="Direction_Swipt">
                {lastDirection ? <h4>You swiped {lastDirection}</h4> : <h4/>}
            </div>
                </div>
            </div>
           
        </div>
    )
}
export default DashBoard