import { useState } from 'react'
import './styles.css'

export function checkWins(squares){
    let count = {};
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
  for(let i=0; i<combinations.length; i++){
    let [a,b,c] = combinations[i];
    if(squares[a] === squares[b] && squares[a] === 'O' && squares[c] === null){
        count[c] = (count[c] || 0) + 1;
    }else if(squares[a] === squares[c] && squares[a] === 'O' && squares[b] === null){
        count[b] = (count[b] || 0) + 1;
    }else if(squares[b] === squares[c] && squares[b] === 'O' && squares[a] === null){
        count[a] = (count[a] || 0) + 1;
    }
  }
  return count;
}

export function checkBlock(squares){
    let count={};
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
  for(let i=0; i<combinations.length; i ++){
    let [a,b,c] = combinations[i];
    if(squares[a] === squares[b] && squares[a] =='X' && squares[c] === null){
        count[c] = (count[c] || 0) + 1;
    }else if(squares[a] === squares[c] && squares[a] =='X' && squares[b] === null){
        count[b] = (count[b] || 0) + 1;
    }else if(squares[b] === squares[c] && squares[b] =='X' && squares[a] === null){
        count[a] = (count[a] || 0) + 1;
    }
  }
}

export function bestBlock(count){
  let bestMove = null;
  let max = -1;
  for(let key in count){
    if(count[key] > max){
      max = count[key];
      bestMove = key;
    }
  }
  return bestMove !== null ? bestMove : null;
}

export function possibleWins(squares, b, c){
  let checkBestMove = [...squares];
  let count = {};
  const moves;
  const maxPossibleWins = -1;
  if(squares[b] === null && squares[c] === null){
    // Check b side
    checkBestMove[b] = 'O';
    moves = checkWins(checkBestMove);
    if(Object.keys(moves).length > 0 && Object.keys(moves).length > maxPossibleWins){
      maxPossibleWins = Object.keys(moves).length;
    }
    checkBestMoves[b] = null;
    count[b] = Number(count[b])>maxPossibleWins?maxPossibleWins:count[b];
    maxPossibleWins = -1;
    
    // Check c side
    checkBestMove[c] = 'O';
    moves = checkWins(checkBestMove);
    if(Object.keys(moves).length > 0 && Object.keys(moves).length > maxPossibleWins){
      maxPossibleWins = Object.keys(moves).length;
    }
    checkBestMoves[c] = null;
    count[c] = Number(count[c])>maxPossibleWins?maxPossibleWins:count[c];

    return 
  }
}

//Work on this
export function regularOption(squares){
  let checkBestMove = [...squares];
  const moves;
  const maxPossibleWins=-1;
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
  if(squares[4] === null){
    return 4;
  }
  for(let i = 0; i < combinations.length; i++){
    let [a,b,c] = combinations[i];
    if(squares[a] === 'O'){
      possibleWins(squares, b, c);
    }else if(combinations[b] === 'O'){
      possibleWins(squares, a, c);
    }else if(combinations[c] === 'O'){
      possibleWins(squares, b, c);
    }
  }
}

export function chooseMove(squares){
  const blocks = checkBlock(squares);
  const wins = checkWins(squares);

  // Can AI WIN and BLOCK?
  for(let key in wins){
    if(blocks[key]){
      return Number(key);
    }
  }

  // Can AI WIN
  if(Object.keys(wins).length > 0){
    return Number(Object.keys(wins)[0]);
  }

  // Can AI BLOCK
  if(Object.keys(blocks).length > 0){
    const bestOption = bestBlock(blocks);
    if(bestOption !== null){
      return Number(bestOption);
    }else{
      return Number(Object.keys(blocks)[0]);
    }
  }

  // Regular Move

}

export function playAI(squares){
    let randomChoose = Math.floor(Math.random()*9);
    const newSquares = [... squares];
    while(newSquares[randomChoose] !== null){
        randomChoose = Math.floor(Math.random()*9);
    }
    newSquares[randomChoose] = 'O';
    return newSquares;
}

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
  const [AIMode, setAIMode] = useState(true);

  function handleClick(i){
    if(squares[i] === null && !checkWinner(squares) && !checkDraw(squares)){
        const nextSquares = [... squares];
      
        nextSquares[i] = 'X';

        const status = checkWinner(nextSquares);
        const draw = checkDraw(nextSquares) && !status;

        setSquares(nextSquares);

        if(status || draw){
            return;
        }

        setXIsNext(false); //Edit here, !xIsNext

        if(AIMode){
            setTimeout(() => {
                const aiMove = playAI(nextSquares);
                if(!checkWinner(nextSquares) && !checkDraw(nextSquares)) {
                    setSquares(aiMove);
                    setXIsNext(true);
                }
            }, 400); //Edit here, !xIsNext
        }
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