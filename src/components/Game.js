import {useContext, useEffect, useState} from 'react' 
import { GameContext } from '../store/GameContext'
import { getIdentities } from '../services/firebase';

export default function Game () {
  const resources = useContext(GameContext)
  const [thisPlayer, setThisPlayer] = useState(0)
  
 

  // Grabbing the resources from database.
  useEffect(()=>{
    getIdentities(resources.room, resources.setPlayerList, resources.setIdentityList)
    setThisPlayer(resources.playerList.indexOf(resources.name))
  },[])
  
  
  //getting the index number of this player:
  function clickHandler() {
    
  }

  function voteHandler(e) {
    console.log(e.target.value)
  }

  return(
    <div>
      
      <button onClick={clickHandler}> Reveal </button>
      
      <h1> You are {resources.name} </h1>
      <h2> Your identity is {resources.identityList[thisPlayer]} </h2>

      <h2> { resources.identityList[thisPlayer] === "spy" ? "Youre a Spy" : "Your Word Is: Tomato" }</h2>

      <ul>
        {resources.playerList.map((player)=>{
          <button onClick={voteHandler} value={player}> {player} </button>
        })}
      </ul>
    </div>
  )
}