import { useEffect, useState, useContext } from 'react'
import { Router, useNavigate } from 'react-router-dom'
import { addPlayer, getPlayerList, createGame, getRoomStatus } from '../services/firebase'
import { GameContext } from '../store/GameContext'

export default function Home() {

const resources = useContext(GameContext)

const [name, setName] = useState('')
const [room, setRoom] = useState('')
// const [playerList, setPlayerList] = useState([])
// const [introOn, setIntroOn] = useState(true)
const navigate = useNavigate();

function joinHandler(name, room) {
  resources.setName(name)
  resources.setRoom(room)
  addPlayer(name, room)
  getPlayerList(room, resources.setPlayerList)
  navigate(`/room/${room}`)
}

function createHandler(name) {
  // Generate Random Room UUID
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  let roomuuid = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
  resources.setName(name)
  resources.setRoom(roomuuid)
  createGame(name, roomuuid)
  //grabs room status doc id (oompa) and status itself (oompaboolean) in firebase - for some reason the word 'status' breaks the code.
  getRoomStatus(roomuuid, resources.setOompa, resources.setOompaboolean)
  getPlayerList(roomuuid, resources.setPlayerList)
  navigate(`/room/${roomuuid}`)
}


return (
  <div>
    <h1> Mr White </h1>
    <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name"/>
    <input value={room} onChange={(e)=>{setRoom(e.target.value)}} placeholder="Room ID"/>
    <button onClick={()=>{joinHandler(name, room)}}> Join </button>

    <button onClick={()=>{createHandler(name)}}> Create Room </button>

        
  </div>
  )
}

// TODO:
// SET UP BROWSER ROUTER
// LINK TO LOBBY
// FINISH UP HOME TO LOBBY SEQUENCE 


        // <button onClick={()=>{
        //   (getPlayerList(room, setPlayerList))
        //   }}> View Data </button>



// import {Link, useParams} from 'react-router-dom';
// import { chatRooms } from '../../data/chatRooms';
// import MessageInput from '../MessageInput/MessageInput';
// import MessageList from '../MessageList/MessageList';


// return(
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Landing />}/>
  //     <Route path='/room/:id' element={<ChatRoom />}/>
  //   </Routes>
  // </BrowserRouter>