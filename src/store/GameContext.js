import {createContext, useState} from 'react'
import { addPlayer, getPlayerList } from './services/firebase'


export const GameContext = createContext({

})

export default function GameResources(props) {
  const context = {
    
  };

  return (
    <GameContext.Provider value = {context}>
      {props.children}
    </GameContext.Provider>
  )
}