
import { useContext, useEffect } from 'react'
import { GameContext } from '../store/GameContext'
import { getResultStatus, updateResultStatusToFalse } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export default function Result() {
  const resources = useContext(GameContext)
  const navigate = useNavigate();

  useEffect(()=>{
    getResultStatus(resources.room, resources.setResultPage, resources.setResultPageBoolean)
    resources.setBeginCalculation(false)
    resources.setVoteArray([])
  },[])

  // For navigating back to game page 
  useEffect(()=>{
    
    if (resources.resultPageBoolean === false) {
      if (resources.name === resources.playerToKick) { //ig you are the player that was kicked
        navigate(`/`)
      } else if (resources.globalSpyCount < (resources.playerList.length - resources.globalSpyCount) && resources.globalSpyCount !== 0) { // 
        navigate(`/game/${resources.room}`)
      } else if (resources.globalSpyCount > (resources.playerList.length - resources.globalSpyCount)){
        navigate(`/`)
      } else if (resources.globalSpyCount === (resources.playerList.length - resources.globalSpyCount)){
        navigate(`/game/${resources.room}`)
      } else if (resources.globalSpyCount === 0) {
        navigate(`/`)
      }
    }
  }, [resources.resultPageBoolean])


  function clickHandler(){
    updateResultStatusToFalse(resources.room, resources.resultPage)
  }

  return(
    <div>
      {resources.playerToKick !== '' ? 
      <div>
        <h1> {resources.playerToKick} Has Been Voted Out </h1> 
        <h1> Their Identity: {resources.playerToKickIdentity} </h1>
        {resources.globalSpyCount > 0 ? 
        <h1> There are {resources.globalSpyCount} Spies Left! </h1> :
        <h1> There are no more spies, victory! </h1>}
      </div>:
      <h1> Everyone Survived! </h1>}


      <button onClick={clickHandler}> Back to Game </button>
    </div>
  )
}