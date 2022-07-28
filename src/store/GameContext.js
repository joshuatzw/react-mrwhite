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
  setName: (()=>null),
  setRoom: (()=>null),
  setIntroOn: (()=>null),
  setPlayerList: (()=>null),
  setIdentityList: (()=>null),
  setOompa: (()=>null),
  setOompaboolean: (()=>null),
})

export default function GameResources(props) {

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [introOn, setIntroOn] = useState(true)
  const [playerList, setPlayerList] = useState([])
  const [identityList, setIdentityList] = useState([])
  const [oompa, setOompa] = useState([])
  const [oompaboolean, setOompaboolean] = useState(false)

  const context = {
    name: name,
    room: room,
    introOn: introOn,
    playerList: playerList,
    identityList: identityList,
    oompa: oompa,
    oompaboolean: oompaboolean,
    setName: setName,
    setRoom: setRoom,
    setIntroOn: setIntroOn,
    setPlayerList: setPlayerList,
    setIdentityList: setIdentityList,
    setOompa: setOompa,
    setOompaboolean: setOompaboolean,
  };

  


  return (
    <GameContext.Provider value = {context}>
      {props.children}
    </GameContext.Provider>
  )
}