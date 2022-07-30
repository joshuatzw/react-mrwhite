import {useContext, useEffect, useState} from 'react' 
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../store/GameContext'
import { getIdentities, castVote, getVotes, getResultStatus, updateResultStatusToFalse, updateResultStatusToTrue, kickPlayer, getSpyCountFromDB, updateSpyCount, getWordNumber } from '../services/firebase';
import { listOfWords } from '../data/listOfWords';

export default function Game () {
  const resources = useContext(GameContext)
  const [thisPlayer, setThisPlayer] = useState(0)
  const [revealIdentity, setRevealIdentity] = useState(false)
  const navigate = useNavigate();
 

  // Grabbing the resources from database, and trigger the getVote listener
  useEffect(()=>{
    resources.setPlayerCount(resources.playerList.length)
    resources.setVoteArray([])
    getWordNumber(resources.room, resources.setGlobalWordNumber)
    getSpyCountFromDB(resources.room, resources.setGlobalSpyCount, resources.setSpyCountDoc)
    getIdentities(resources.room, resources.setPlayerObject, resources.setPlayerList)
    setThisPlayer(resources.playerList.indexOf(resources.name))
    getResultStatus(resources.room, resources.setResultPage, resources.setResultPageBoolean)
    getVotes(resources.room, resources.playerList.length, resources.setVoteArray, resources.setBeginCalculation)

  },[])


  // useEffect for navigation to result page 
  useEffect(()=>{
    if (resources.resultPageBoolean === true) {
      navigate(`/result/${resources.room}`)
    }
  },[resources.resultPageBoolean])


  useEffect(()=>{
    if (resources.beginCalculation === true) {
        // This creates a consolidated object with {name: votes}
        let voteTabulationObject = {};
        let voteCount = 1;
        for (let i = 0; i < resources.playerList.length; i++) {
          for (let j = 0; j < resources.voteArray.length; j++) {
            if (resources.playerList[i] === resources.voteArray[j]) {
              if (voteTabulationObject[resources.playerList[i]] === undefined) {
                voteTabulationObject[resources.playerList[i]] = voteCount
              } else {
                voteTabulationObject[resources.playerList[i]] = voteTabulationObject[resources.playerList[i]] + 1
                // console.log("adding vote")
              }}}}

        // This splits the object up into a name array and a vote array, to allow comparison
        const voteKeys = Object.keys(voteTabulationObject)
        const voteValues = voteKeys.map(key => {
          return voteTabulationObject[key]
        }) 

        console.log("vote Keys: " + voteKeys)
        console.log("vote Values: " + voteValues)

        let highestVotedPlayer = ''
        if (voteValues.length - 1 === 0){
          highestVotedPlayer = voteKeys[0]
        } else {
          for (let i = 0; i < voteValues.length - 1; i++) {
            if (voteValues[i] > voteValues[i+1]) {
              highestVotedPlayer = voteKeys[i]
            } else if (voteValues[i] < voteValues[i+1]){
              highestVotedPlayer = voteKeys[i+1]
            } else if (voteValues[i] === voteValues[i+1]){
              highestVotedPlayer = ''
            }
          }
        }
        
        console.log("highest voted player is: " + highestVotedPlayer)
        
        // Using this to update local list of identities for game tracking 
        resources.setPlayerToKick(highestVotedPlayer)
        resources.setPlayerToKickIdentity(resources.playerObject[highestVotedPlayer])

        //game logic checking for spies: 
        if (resources.playerObject[highestVotedPlayer] === "spy") {
          updateSpyCount(resources.room, resources.spyCountDoc, resources.globalSpyCount, resources.setGlobalSpyCount)
          console.log("spy count drop")
        } else {
          console.log("voted player was not a spy.")
          console.log(resources.globalSpyCount)
        }

        resources.setPlayerCount(resources.playerCount - 1)

        // need to call a fuinction here to boot this player out of db
        kickPlayer(highestVotedPlayer, resources.room)

        // Set the result page boolean.
        updateResultStatusToTrue(resources.room, resources.resultPage)
    }

  }, [resources.beginCalculation])
  
  
  //getting the index number of this player:
  function clickHandler() {
    setRevealIdentity(!revealIdentity)
  }

  function voteHandler(e) {
    let vote = e.target.value
    castVote(vote, resources.room)
  }

  return(
    <div>
      
      <h1> You are {resources.name} </h1>

      <button onClick={clickHandler}> Show / Hide </button>

      {revealIdentity ? 
      <div>
        <h2> Your identity is {resources.playerObject[resources.name]} </h2> 
        <h2> { resources.playerObject[resources.name] === "spy" ? "Youre a Spy" : `Your Word Is: ${listOfWords[resources.globalWordNumber]}` }</h2>
      </div>
      : null}
      
      <br />

      <h2> Please Vote For 1 Individual You Think Is The Spy </h2>

        {resources.playerList.map((player)=>{
          return(
          <button className='btn' key={player} onClick={voteHandler} value={player}> {player} </button>
          )
        })}
 
    </div>
  )
}