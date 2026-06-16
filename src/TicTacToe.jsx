import { useState } from 'react'
import './styles.css'

export function checkWinner(squares){
  const combinations= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i < combinations.length; i ++){
    const[a,b,c] = combinations[i];
    let find = squares[a];
    if(find !== null && find === squares[b] && find === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export function Square({ value, onSquareClick }){
  return <button className="square" onClick={onSquareClick}> {value} </button>;
}

export default function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    if(squares[i] === null && !checkWinner(squares)){
      const nextSquares = squares.slice();
      if(xIsNext){
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  }

  const status = checkWinner(squares);
  let winner;
  if(status){
    winner = 'Winner: ' + status;
  }else{
    winner = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return<>
    <div className="status">{winner}</div>
    <div className="background">
      <div className="boardRow"> 
        <Square value={squares[0]} onSquareClick = {() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick = {() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick = {() => handleClick(2)}/>
      </div>
      <div className="boardRow"> 
        <Square value={squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick = {() => handleClick(5)}/>
      </div>
      <div className="boardRow">
        <Square value={squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick = {() => handleClick(8)}/>
      </div>
    </div>
  </>



}