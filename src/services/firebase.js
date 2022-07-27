import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  addDoc, 
  collection, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query,
  orderBy,
  QuerySnapshot, 
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
      callback(array)
    }
  )
}

export {addPlayer, getPlayerList}