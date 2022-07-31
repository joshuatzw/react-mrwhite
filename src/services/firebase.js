import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  addDoc,
  deleteDoc,
  doc,
  setDoc, 
  collection, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query,
  orderBy,
  QuerySnapshot,
  updateDoc, 
} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvwiM8aeIZRpOpVldwzh4jLCH6iZEKW4Q",
  authDomain: "mrwhite-44115.firebaseapp.com",
  projectId: "mrwhite-44115",
  storageBucket: "mrwhite-44115.appspot.com",
  messagingSenderId: "404567960999",
  appId: "1:404567960999:web:65819980bfeb57d2ef1a82",
  measurementId: "G-6Z460KVHPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function createGame(name, room, number) {
  // For host usage. When creating room, add themselves into a room.
  try {
    await addDoc(collection(db, "rooms", room, "players"), {
      playerName: name
    })
  } catch (error) {
    console.error(error)
  }

  //Introduce a boolean for lobby to game.
  try {
    await addDoc(collection(db, "rooms", room, "status"), {
      status: false
    })
  } catch (error) {
    console.error(error)
  }

  //Introduce a boolean for game to result and vice versa.
  try {
    await addDoc(collection(db, "rooms", room, "results-page-status"), {
      status: false
    })
  } catch (error) {
    console.error(error)
  }

   //Introduce a boolean for game to end.
   try {
    await addDoc(collection(db, "rooms", room, "end-game-status"), {
      status: false
    })
  } catch (error) {
    console.error(error)
  }

  try {
    await addDoc(collection(db, "rooms", room, "word-index-number"), {
      wordNumber: number
    } )
  } catch (error) {
    console.error(error)
  }
}

async function getWordNumber(room, callback) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "word-index-number")
    ), (data) => {

      const status = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
      
      if (callback) {
        callback(status[0].wordNumber)
      }
    }
  )
}


// Room Status --> When this turns true, everyone's screens will be redirected. 
async function getRoomStatus(room, callbackStatusID, callbackstatus) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "status")
    ), (data) => {

      const status = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
      
      if (callbackStatusID && callbackstatus) {
        callbackStatusID(status[0].id)
        callbackstatus(status[0].status)
      }

    }
  )
}

async function updateRoomStatus(room, id) {
  console.log(id)
  const location = doc(db, "rooms", room, "status", id)
  const newStatus = {status: true}
  await updateDoc(location, newStatus)
}

async function addPlayer(name, room) {
  try {
    await addDoc(collection(db, "rooms", room, "players"), {
      playerName: name
    })
  } catch (error) {
    console.error(error)
  }

}

async function kickPlayer(name, room) {
  const snapshot = await getDocs(collection(db, "rooms", room, "identities"))
  const query = snapshot.docs.map((doc) => ({
    ...doc.data(), id: doc.id
  }))
  
  for (let i = 0; i < query.length; i++) {
    console.log("player " + query[i].playerName + " ID is " + query[i].id)
    if (name === query[i].playerName) {
      console.log("player " + query[i].playerName + " is being kicked.")
      await deleteDoc(doc(db, "rooms", room, "identities", query[i].id))
    }   
  }
}

async function getPlayerList(room, callback) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "players")
    ), (data) => {
      const players = data.docs.map((doc) => ({
        // id: doc.id,
        ...doc.data()
      }));
      let array = [];
      players.map((player) => {
        array.push(player.playerName)
      })
      // console.log(array)
      if (callback) {
        callback(array)
      } else {
        console.log(array)
        return(array)
      }
    }
  )
}

async function putIdentities(room, playerArray, identityArray) {
  // push the latest list from resources into the database indicating who is good and who is bad.
  // then, everyone from the database to get their own identity
 // you stopped here 
  try {
    for (let i = 0; i < playerArray.length; i++){
      await addDoc(collection(db, "rooms", room, "identities"), {
        playerName: playerArray[i],
        playerIdentity: identityArray[i]
    })
  }} catch (error) {
    console.error(error)
  }
}

async function getIdentities(room, setPlayerObject, setPlayerList) {

  //instead of 2 separate arrays (as per game init), we should consider merging it into an object for clarity after the start up.
  return onSnapshot(
    query(
      collection(db, "rooms", room, "identities")
    ), (data) => {
      const identities = data.docs.map((doc) => ({
        // id: doc.id,
        ...doc.data()
      }));
      let identityArray = [];
      let nameArray = [];
      identities.map((player) => {
        nameArray.push(player.playerName)
        identityArray.push(player.playerIdentity)
      })
      // console.log(array)
      let playerObject = {};
      if (setPlayerObject) {
        for (let i = 0; i < nameArray.length; i++) {
          playerObject[nameArray[i]] = identityArray[i]
        }
        setPlayerObject(playerObject)
        setPlayerList(nameArray)
        
      } else {
        return null
      }
    }
  )
}

async function putNumberOfSpiesInDB(room, number) {
  // push list of spies in db
  try {
      await addDoc(collection(db, "rooms", room, "spy-count"), {
        spyCount: number
    })
  } catch (error) {
    console.error(error)
  }
}

async function updateSpyCount(room, id, number, setGlobalSpyCount) {
  console.log(id)
  const location = doc(db, "rooms", room, "spy-count", id)
  const newCount = {spyCount: number - 1}
  setGlobalSpyCount(number - 1)
  await updateDoc(location, newCount)
}

async function getSpyCountFromDB(room, setSpyCount, setSpyCountID) {
  //instead of 2 separate arrays (as per game init), we should consider merging it into an object for clarity after the start up.
  return onSnapshot(
    query(
      collection(db, "rooms", room, "spy-count")
    ), (data) => {
      const spyCount = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      let numberOfSpies = [];
      let spyCountId = [];
      spyCount.map((doc) => {
        numberOfSpies.push(doc.spyCount)
        spyCountId.push(doc.id)
      })
      
      if (setSpyCount) {
        setSpyCount(numberOfSpies[0])
        setSpyCountID(spyCountId[0])
        
      } else {
        console.log("no callback provided.")
        return null
      }
    }
  )
}


async function castVote(vote, room) {
  // For host usage. When creating room, add themselves into a room.
  try {
    await addDoc(collection(db, "rooms", room, "votes"), {
      vote: vote
    })
  } catch (error) {
    console.error(error)
  }
}

// getVotes --> logic to identify player voted out, remove player from game, handle redirect logic.
async function getVotes(room, playerCount, setVoteArray, setBeginCalculation) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "votes")
    ), (data) => {
      const votes = data.docs.map((doc) => ({
        // id: doc.id,
        ...doc.data()
      }));
      let voteArray = [];
        votes.map((vote)=>{
        voteArray.push(vote.vote)
      })

      if (voteArray.length < playerCount) {
        console.log("Votes not complete")
        console.log(voteArray)
      } 
      
      // Begin looong sequence of identifying voter, kicking that player out, and navigation(?)
      else 
      
      {
        // Handled in Game.js file.
        setVoteArray(voteArray)
        setBeginCalculation(true)
        deleteVotes(room)

      }
      return null
    }
  )
}

async function deleteVotes(room) {
  const snapshot = await getDocs(collection(db, "rooms", room, "votes"))
  const query = snapshot.docs.map((doc) => ({
    ...doc.data(), id: doc.id
  }))
  
  for (let i = 0; i < query.length; i++) {
    console.log("document voting id: " + query[i].id)
    await deleteDoc(doc(db, "rooms", room, "votes", query[i].id))
  }
  
  
}

async function getResultStatus(room, callbackStatusID, callbackstatus) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "results-page-status")
    ), (data) => {

      const resultsStatus = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))

      console.log(resultsStatus[0].id)
      console.log(resultsStatus[0].status)
      
      if (callbackStatusID && callbackstatus) {
        callbackStatusID(resultsStatus[0].id)
        callbackstatus(resultsStatus[0].status)
      }

    }
  )
}

async function updateResultStatusToTrue(room, id) {
  const location = doc(db, "rooms", room, "results-page-status", id)
  const newStatus = {status: true}
  await updateDoc(location, newStatus)
}

async function updateResultStatusToFalse(room, id) {
  const location = doc(db, "rooms", room, "results-page-status", id)
  const newStatus = {status: false}
  await updateDoc(location, newStatus)
}


async function getEndGameStatus(room, callbackStatusID, callbackstatus) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "end-game-status")
    ), (data) => {

      const resultsStatus = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
      
      if (callbackStatusID && callbackstatus) {
        callbackStatusID(resultsStatus[0].id)
        callbackstatus(resultsStatus[0].status)
      }

    }
  )
}

async function updateEndGameStatusToTrue(room, id) {
  console.log(id)
  const location = doc(db, "rooms", room, "end-game-status", id)
  const newStatus = {status: true}
  await updateDoc(location, newStatus)
}



export {addPlayer,
        kickPlayer,
        getPlayerList, 
        putIdentities, 
        getIdentities, 
        getRoomStatus, 
        createGame, 
        updateRoomStatus,
        castVote,
        getVotes,
        getResultStatus,
        updateResultStatusToTrue,
        updateResultStatusToFalse,
        updateEndGameStatusToTrue,
        getEndGameStatus,
        putNumberOfSpiesInDB,
        updateSpyCount,
        getSpyCountFromDB,
        getWordNumber,
      } 