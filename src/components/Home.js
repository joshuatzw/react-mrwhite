import { useEffect, useState } from 'react'
import { Router, useNavigate } from 'react-router-dom'
import { addPlayer, getPlayerList } from './services/firebase'

export default function Home() {

const [name, setName] = useState('')
const [room, setRoom] = useState('')
const [playerList, setPlayerList] = useState([])
const [introOn, setIntroOn] = useState(true)
const navigate = useNavigate();

function clickHandler() {
  addPlayer(name, room)
  setIntroOn(false)
}


return (
  <div>
    <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name"/>
        <input value={room} onChange={(e)=>{setRoom(e.target.value)}} placeholder="Room ID"/>
        <button onClick={()=>{addPlayer(name, room)}}> Join </button>

        {useEffect(()=>{
          navigate(`/room/${room}`)
        }, [introOn])} 
        

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

// import { Link } from "react-router-dom";
// <Link to={`/room/${room.id}`}> {room.title} </Link>




// import {Link, useParams} from 'react-router-dom';
// import { chatRooms } from '../../data/chatRooms';
// import MessageInput from '../MessageInput/MessageInput';
// import MessageList from '../MessageList/MessageList';


// return(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Landing />}/>
//       <Route path='/room/:id' element={<ChatRoom />}/>
//     </Routes>
//   </BrowserRouter>