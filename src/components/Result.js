
import { useContext, useEffect } from 'react'
import { GameContext } from '../store/GameContext'
import { getResultStatus, updateResultStatusToFalse, updateEndGameStatusToTrue, getEndGameStatus, getIdentities } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export default function Result() {
  const resources = useContext(GameContext)
  const navigate = useNavigate();

  useEffect(()=>{
    getResultStatus(resources.room, resources.setResultPage, resources.setResultPageBoolean)
    getEndGameStatus(resources.room, resources.setEndGamePage, resources.setEndGameBoolean)
    getIdentities(resources.room, resources.setPlayerObject, resources.setPlayerList)
    resources.setBeginCalculation(false)
    resources.setVoteArray([])
    console.log(resources.playerCount)
    console.log(resources.globalSpyCount)
  },[])

  // For navigating back to game page 
  useEffect(()=>{
    if (resources.resultPageBoolean === false) {
      if (resources.name === resources.playerToKick) { //ig you are the player that was kicked
        navigate(`/`)
      } else {
        navigate(`/game/${resources.room}`)
      }
    }
  }, [resources.resultPageBoolean])

  // For navigating to Home Page when game is over.
  useEffect(()=>{
    if (resources.endGameBoolean === true) {
      
      // Sequence to delete all room details
      resources.setGlobalSpyCount(0)
      resources.setBeginCalculation(false)
      resources.setGlobalWordNumber(0)
      resources.setOompaboolean(false)
      resources.setIntroOn(true)
      resources.setResultPage(false)
      resources.setEndGameBoolean(false)
      resources.setRoom('')
      resources.setName('')
      resources.setPlayerList([])
      resources.setIdentityList([])
      resources.setVoteArray([])
      resources.setPlayerObject({})

      // navigate to home page.
      navigate(`/`)
    }
  }, [resources.endGameBoolean])


  function resumeGameClickHandler(){
    updateResultStatusToFalse(resources.room, resources.resultPage)
  }

  function endGameClickHandler(){
    updateEndGameStatusToTrue(resources.room, resources.endGamePage)
  }

  return(
    <div>
      {resources.playerToKick !== '' ? 
      
      // If a player had been voted out: 
      <div>
        <h1> {resources.playerToKick} Has Been Voted Out </h1> 
        <h1> Their Identity: {resources.playerToKickIdentity} </h1>
        
        {/* Display Varying text depending on spyoutcome */}
        {resources.globalSpyCount !== 0 && resources.globalSpyCount < resources.playerCount - resources.globalSpyCount ?

          // Spies Remaining, but number is less than players.
        <div> 
          <h1> There are {resources.globalSpyCount} Spies Left! </h1> 
          <h2> There are {resources.playerCount - resources.globalSpyCount} good guys left! </h2>
          <button onClick={resumeGameClickHandler}> Back to Game </button>
        </div>

        // Spies Remaining, but number more than or == number of players.
        : resources.globalSpyCount > (resources.playerCount - resources.globalSpyCount) ? // spies more than good
        <div>
          <h1> The Spies Have Won! </h1>
          <button onClick={endGameClickHandler}> Game Over </button>
        </div>

        : (resources.playerCount - resources.globalSpyCount === 1) ? // spies more than good
        <div>
          <h1> The Spies Have Won! </h1>
          <button onClick={endGameClickHandler}> Game Over </button>
        </div>
        
        : // no more spies
        <div> 
          <h1> There are no more spies, victory! </h1>
          <button onClick={endGameClickHandler}> Game Over </button>
        </div>
        }
      </div>:
      <h1> Everyone Survived! </h1>}


      
    </div>
  )
}