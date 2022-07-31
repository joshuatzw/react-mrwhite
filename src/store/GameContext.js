import {createContext, useState} from 'react'


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
  endGamePage: [],
  endGameBoolean: false,
  spyCountDoc: null,
  globalWordNumber: 0,
  playerCount: 0,
  wordGuessed: false,
  wordGuessedDoc: [],
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
  setEndGamePage: (()=>null),
  setEndGameBoolean: (()=>null),
  setSpyCountDoc: (()=>null),
  setGlobalWordNumber: (()=>null),
  setPlayerCount: (()=>null),
  setWordGuessed: (()=>null),
  setWordGuessedDoc: (()=>null),
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
  const [spyCountDoc, setSpyCountDoc] = useState()
  const [endGamePage, setEndGamePage] = useState([])
  const [endGameBoolean, setEndGameBoolean] = useState(false)
  const [globalWordNumber, setGlobalWordNumber] = useState(0)
  const [playerCount, setPlayerCount] = useState(0)
  const [wordGuessed, setWordGuessed] = useState(false)
  const [wordGuessedDoc, setWordGuessedDoc] = useState([])

  

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
    endGamePage: endGamePage,
    endGameBoolean: endGameBoolean,
    spyCountDoc: spyCountDoc,
    globalWordNumber: globalWordNumber,
    playerCount: playerCount,
    wordGuessed: wordGuessed,
    wordGuessedDoc: wordGuessedDoc,
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
    setEndGamePage: setEndGamePage,
    setEndGameBoolean: setEndGameBoolean,
    setSpyCountDoc: setSpyCountDoc,
    setGlobalWordNumber: setGlobalWordNumber,
    setPlayerCount: setPlayerCount,
    setWordGuessed: setWordGuessed,
    setWordGuessedDoc: setWordGuessedDoc,
  };

  


  return (
    <GameContext.Provider value = {context}>
      {props.children}
    </GameContext.Provider>
  )
}