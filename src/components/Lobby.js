import { useContext, useEffect, useLayoutEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPlayerList, putIdentities, getRoomStatus, updateRoomStatus } from '../services/firebase';
import { GameContext } from '../store/GameContext';
import './Lobby.css'
import { spyCount, spyCountMoreThan10 } from '../data/gamedata';

export default function Lobby() {

  const resources = useContext(GameContext)
  
  const params = useParams();
  const navigate = useNavigate();

  function numberGenerator(target, playerCount){
    let numbersArray = []
    for (let i = 0; i < target; i++){
      numbersArray.push(Math.floor(Math.random() * playerCount))
    }
    
    // Set is a special data structure introduced in ES6
    // It can only contain unique values, so all non-uniques are filtered out
    // the Array.from() method converts SEt back to an Array
    const unique = Array.from(new Set(numbersArray));

    if (unique.length !== numbersArray.length) {
      numberGenerator(target, playerCount)
    } else {
      return (numbersArray)
    }
  }

  function startGame() {
    // Shuffle list of players
    let identities = [];
    let numberOfSpies = 0;
    const playerlength = resources.playerList.length

    // Identify No. Spies according to quantum
    if (playerlength > 10) {
      numberOfSpies = spyCountMoreThan10
    } else {
      numberOfSpies = spyCount[playerlength]
    }
    
    //Everyone is a good guy first, in a separate array.
    for (let i = playerlength; i > 0; i--) {
      identities.push("good")
    }

    let spyArray = numberGenerator(numberOfSpies, playerlength)
    // console.log(spyArray.length)
    for (let i = 0; i < spyArray.length; i++) {
      identities[spyArray[i]] = "spy"
    }

    resources.setIdentityList(identities)
    
    // Sending this data to firebase. Room number, [players], [identities]
    putIdentities(resources.room, resources.playerList, identities)

    // Send word to players from data store
    updateRoomStatus(resources.room, resources.oompa, resources.setOompaboolean)

    // navigate to Game Screen
    // 
  }

  // useEffect(()=>{
  //   if (resources.oompaboolean == true) {
  //     navigate(`/game/${resources.room}`)
  //   }
  // }, [resources.oompaboolean])

  useEffect(() => {
    const unsubscribe = getRoomStatus(resources.room, null)
    console.log(unsubscribe)

    if (unsubscribe === true) {
      navigate(`/game/${resources.room}`)
    } else {
      return undefined
    }

    return unsubscribe

  }, [getRoomStatus(resources.room, null)])



  return (
    <div>
      <h1> Room {resources.room} </h1>
      <h2> Player count: {resources.playerList.length} </h2>
      <ul>
        {resources.playerList.map((player)=>{
          return(
            <li key={player}> {player} </li>
          )
        })}
      </ul>

      <button onClick={startGame}> Start Game</button>
    </div>

        
  )
}