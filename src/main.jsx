import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Board from './TicTacToe.jsx'

/*
function App(){
  const [gameStarted, setGameStarted] = useState(false);
  const [playerStarts, setPlayerStarts] = useState(true);

  if(!gameStarted){
    return(
    <div className = 'menu'>
      <h2>Who Starts?</h2>
      <button onClick = {() =>{
        setPlayerStarts(true),
        setGameStarted(true)
      }}>You (X)</button>

      <button onClick={() =>{
        setPlayerStarts(false);
        setGameStarted(true);
      }}>Computer (O)</button>
    </div>
    );
  }
  return(<Board playerStarts = {playerStarts}/>);
}*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Board />
  </StrictMode>
);