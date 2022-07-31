
import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../store/GameContext'
import { getResultStatus, updateResultStatusToFalse, updateEndGameStatusToTrue, getEndGameStatus, getIdentities, getWordGuessedStatus, updateWordGuessedStatusToTrue, updateWordGuessedStatusToFalse } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { listOfWords } from '../data/listOfWords'

export default function Result() {
  const resources = useContext(GameContext)
  const navigate = useNavigate();
  const [guess, setGuess] = useState('')

  useEffect(()=>{
    getWordGuessedStatus(resources.room, resources.setWordGuessedDoc, resources.setWordGuessed)
    getResultStatus(resources.room, resources.setResultPage, resources.setResultPageBoolean)
    getEndGameStatus(resources.room, resources.setEndGamePage, resources.setEndGameBoolean)
    getIdentities(resources.room, resources.setPlayerObject, resources.setPlayerList)
    resources.setBeginCalculation(false)
    resources.setVoteArray([])
    
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
      resources.setResultPage([])
      resources.setResultPageBoolean(false)


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

   function guessHandler() {
    
    const word = listOfWords[resources.globalWordNumber]
    console.log(word.toLowerCase())
    console.log(guess.toLowerCase())
    console.log(resources.wordGuessed)
    if (guess.toLowerCase() == word.toLowerCase()) {
      console.log("word guessed")
      updateWordGuessedStatusToTrue(resources.room, resources.wordGuessedDoc)
    } else {
      console.log("word not guessed")
      updateWordGuessedStatusToFalse(resources.room, resources.wordGuessedDoc)
    }
  }

  return(
    <div>
      {resources.playerToKick !== '' ? 
      
      // If a player had been voted out: 
      <div>
        <h2> {resources.playerToKick} Has Been Voted Out </h2> 
        <h2> Their Identity: {resources.playerToKickIdentity} </h2>
        
        {/* Display Varying text depending on spyoutcome */}
        {resources.globalSpyCount !== 0 && resources.globalSpyCount < resources.playerCount - resources.globalSpyCount ?

          // Spy has been voted out 
          // Spies Remaining, but number is less than players.
        <div> 
          <h2> There are {resources.globalSpyCount} Spies Left! </h2>
          <h2> There are {resources.playerCount - resources.globalSpyCount} good guys left! </h2>
          <button onClick={resumeGameClickHandler}> Back to Game </button>
        </div>

        // Spies Remaining, but number more than or == number of players.
        : resources.globalSpyCount > (resources.playerCount - resources.globalSpyCount) ? // spies more than good
        <div>
          <h2> The Spies Have Won! </h2>
          <button onClick={endGameClickHandler}> Game Over </button>
        </div>

        : (resources.playerCount - resources.globalSpyCount === 1) ? // spies more than good
        <div>
          <h2> The Spies Have Won! </h2>
          <button onClick={endGameClickHandler}> Game Over </button>
        </div>
        
        : 
        // Spy has been voted out 
        // no more spies
        <div> 
          <h1> There are no more spies, victory? </h1>
            <div>
              <input className='homepage-input' placeholder='Make a Guess!' value={guess} onChange={((e)=>{setGuess(e.target.value)})}/>
              <br />
              <button className='result-button' onClick={guessHandler}> Guess! </button>
           </div>
          <button className='result-button' onClick={endGameClickHandler}> Game Over </button>
        </div>
        }
      </div>:
      <h1> Everyone Survived! </h1>}


      { resources.wordGuessed === true ? 
        <h1> THE SPIES WON!</h1> 
        : resources.wordGuessed === false ?
        <h1> THE SPIES LOST! </h1> :
        null
      }


      
    </div>
  )
}