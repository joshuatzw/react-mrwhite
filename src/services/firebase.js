import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  addDoc,
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


async function createGame(name, room) {
  // For host usage. When creating room, add themselves into a room.
  try {
    await addDoc(collection(db, "rooms", room, "players"), {
      playerName: name
    })
  } catch (error) {
    console.error(error)
  }

  //Introduce a boolean.
  try {
    await addDoc(collection(db, "rooms", room, "status"), {
      status: false
    })
  } catch (error) {
    console.error(error)
  }
}

// Room Status --> When this turns true, everyone's screens will be redirected. 
async function getRoomStatus(room, callbackStatusID) {
  return onSnapshot(
    query(
      collection(db, "rooms", room, "status")
    ), (data) => {

      const status = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))

      console.log(status[0].id)
      console.log(status[0].status)
      
      if (callbackStatusID ) {
        callbackStatusID(status[0].id)
      }

      return(status[0].status)
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

async function getIdentities(room, callbackName, callbackIdentity) {
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
      if (callbackName && callbackIdentity) {
        callbackName(nameArray)
        callbackIdentity(identityArray)
      } else {
        console.log(nameArray)
        console.log(identityArray)
        return null
      }
    }
  )
}




export {addPlayer, getPlayerList, putIdentities, getIdentities, getRoomStatus, createGame, updateRoomStatus}