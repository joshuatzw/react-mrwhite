import {createContext, useState} from 'react'
import { addPlayer, getPlayerList } from '../services/firebase'


export const GameContext = createContext({
  name: '',
  room: '',
  introOn: true,
  playerList: [],
  identityList: [],
  oompa: [],
  oompaboolean: false,
  resultPage: [],
  resultPageBoolean: false,
  playerToKick: '',
  playerToKickIdentity: '',
  beginCalculation: false,
  voteArray: [],
  playerObject: {},
  globalSpyCount: 0,
  setName: (()=>null),
  setRoom: (()=>null),
  setIntroOn: (()=>null),
  setPlayerList: (()=>null),
  setIdentityList: (()=>null),
  setOompa: (()=>null),
  setOompaboolean: (()=>null),
  setResultPage: (()=>null),
  setResultPageBoolean: (()=>null),
  setPlayerToKick: (()=>null),
  setPlayerToKickIdentity: (()=>null),
  setBeginCalculation: (()=>null),
  setVoteArray: (()=>null),
  setPlayerObject: (()=>null),
  setGlobalSpyCount: (()=>null),
})

export default function GameResources(props) {

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [introOn, setIntroOn] = useState(true)
  const [playerList, setPlayerList] = useState([])
  const [identityList, setIdentityList] = useState([])
  const [oompa, setOompa] = useState([])
  const [oompaboolean, setOompaboolean] = useState(false)
  const [resultPage, setResultPage] = useState([])
  const [resultPageBoolean, setResultPageBoolean] = useState(false)
  const [playerToKick, setPlayerToKick] = useState('')
  const [playerToKickIdentity, setPlayerToKickIdentity] = useState('')
  const [beginCalculation, setBeginCalculation] = useState(false)
  const [voteArray, setVoteArray] = useState([])
  const [playerObject, setPlayerObject] = useState({})
  const [globalSpyCount, setGlobalSpyCount] = useState(0)
  

  const context = {
    name: name,
    room: room,
    introOn: introOn,
    playerList: playerList,
    identityList: identityList,
    oompa: oompa,
    oompaboolean: oompaboolean,
    resultPage:resultPage,
    resultPageBoolean:resultPageBoolean,
    playerToKick: playerToKick,
    playerToKickIdentity: playerToKickIdentity,
    beginCalculation: beginCalculation,
    voteArray: voteArray,
    playerObject: playerObject,
    globalSpyCount: globalSpyCount,
    setName: setName,
    setRoom: setRoom,
    setIntroOn: setIntroOn,
    setPlayerList: setPlayerList,
    setIdentityList: setIdentityList,
    setOompa: setOompa,
    setOompaboolean: setOompaboolean,
    setResultPage: setResultPage,
    setResultPageBoolean: setResultPageBoolean,
    setPlayerToKick: setPlayerToKick,
    setPlayerToKickIdentity: setPlayerToKickIdentity,
    setBeginCalculation: setBeginCalculation,
    setVoteArray: setVoteArray,
    setPlayerObject: setPlayerObject,
    setGlobalSpyCount: setGlobalSpyCount,
  };

  


  return (
    <GameContext.Provider value = {context}>
      {props.children}
    </GameContext.Provider>
  )
}