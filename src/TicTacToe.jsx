import { useState } from 'react'
import './styles.css'


export function checkDraw(squares){
  for(let i =0; i < squares.length; i ++){
    if(squares[i] === null){
      return false;
    }
  }
  return true;
}

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
      return [a,b,c];
    }
  }
  return null;
}

export function Square({ value, onSquareClick, highlight }){
  return <button className={(value==='X'? 'x' : value==='O'?'o':'square') + (highlight ? ' highlight' : '')} onClick={onSquareClick}> {value} </button>;
}

export function Reset({onResetClick}){
  return <>
    <button className="reset" onClick={onResetClick}>
      Reset Game
    </button>
  </>
}

export default function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    if(squares[i] === null && !checkWinner(squares) && !checkDraw(squares)){
      const nextSquares = [... squares];
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
    winner = 'Winner: ' + squares[status[0]];
  }else{
    winner = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const draw = checkDraw(squares) && !status;

  return<>
    <div className="status">{draw? 'Draw' : winner}</div>
    <div className="background">
      <div className="boardRow"> 
        <Square value={squares[0]} onSquareClick = {() => handleClick(0)} highlight={status?.includes(0)}/>
        <Square value={squares[1]} onSquareClick = {() => handleClick(1)} highlight={status?.includes(1)}/>
        <Square value={squares[2]} onSquareClick = {() => handleClick(2)} highlight={status?.includes(2)}/>
      </div>
      <div className="boardRow"> 
        <Square value={squares[3]} onSquareClick = {() => handleClick(3)} highlight={status?.includes(3)}/>
        <Square value={squares[4]} onSquareClick = {() => handleClick(4)} highlight={status?.includes(4)}/>
        <Square value={squares[5]} onSquareClick = {() => handleClick(5)} highlight={status?.includes(5)}/>
      </div>
      <div className="boardRow">
        <Square value={squares[6]} onSquareClick = {() => handleClick(6)} highlight={status?.includes(6)}/>
        <Square value={squares[7]} onSquareClick = {() => handleClick(7)} highlight={status?.includes(7)}/>
        <Square value={squares[8]} onSquareClick = {() => handleClick(8)} highlight={status?.includes(8)}/>
      </div>
    </div>
    <Reset onResetClick={() => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      }} />
  </>



}