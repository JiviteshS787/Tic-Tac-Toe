import { useState, useEffect, useRef } from 'react'
import './styles.css'

// Check possile future wins granted current grid
export function checkWins(squares){
  let count = {};
  const combinations= [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

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

// Check possible future blocks granted current grid
export function checkBlock(squares){
  let count={};
  const combinations= [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

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
  return count;
}

// Check best possible move for wins/blocks
export function getBest(count){
  let bestMove = null;
  let max = -1;
  for(let key in count){
    if(count[key] > max){
      max = count[key];
      bestMove = key;
    }
  }
  return bestMove !== null ? Number(bestMove) : null;
}

export function blockNeeded(squares){
  const combinations= [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  for(const [a,b,c] of combinations){
    const line = [squares[a], squares[b], squares[c]];
    const aiWin = line.filter(s => s === 'O').length;
    const empty = line.filter(s => s === null).length;
    if(aiWin == 2 && empty == 1){
      return [a,b,c];
    }
  }
  return null;
}

export function checkForkWins(squares){
  const combos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  let wins = 0;
  for(const [a,b,c] of combos){
    let row = [squares[a], squares[b], squares[c]];
    let playerWin = row.filter(s => s === 'X').length;
    let empty = row.filter(s => s === null).length;

    if(playerWin === 2 && empty === 1){
      wins++;
    }
  }
  return Number(wins);
}

export function isFork(squares){
  for(let i = 0; i < 9; i ++){
    if(squares[i] === null){
      const check = [...squares];
      check[i] = 'X';
      console.log("This is the X placement: " + i);
      if(checkForkWins(check) >= 2){
        return true;
      }
    }
  }
  return false;
}

export function isForkTwo(squares){
  if(checkForkWins(squares) >= 2){
    return true;
  }
  return false;
}

export function regularOption(squares){
  let count = {};
  if(squares[4] === null){
    return 4;
  }
  for(let i = 0; i < 9; i ++){
    if(squares[i] === null){
      const test = [...squares];
      test[i] = 'O';

      const moves = checkWins(test);
      const futureWins = Object.values(moves).reduce((a,b)=>a+b, 0);

      count[i] = futureWins;
    }
  }
  return getBest(count);
}

export function chooseMove(squares){
  const blocks = checkBlock(squares);
  const wins = checkWins(squares);

  if(squares[4] === null){
    return 4;
  }

  // Can AI WIN and BLOCK?
  for(let key in wins){
    if(blocks[key]){
      return Number(key);
    }
  }

  // Can AI WIN
  const bestWin = getBest(wins);
  if(bestWin !== null){
    return bestWin;
  }

  // Can AI BLOCK
  if(Object.keys(blocks).length > 0){
    const bestOption = getBest(blocks);
    if(bestOption !== null){
      return bestOption;
    }else{
      return Number(Object.keys(blocks)[0]);
    }
  }
  
  
  // Prevent forks
  for(let i = 0; i < 9; i ++){
    if(squares[i] === null){
      const test = [...squares];
      test[i] = 'O';
      // console.log("This is O placement: " + i);
      // check if O can win first
      // console.log("This is the O placement: " + i);
      const win = blockNeeded(test);
      if(win !== null){
        const block = win.filter(w => test[w] === null);
        // console.log("This is where you need to block O: " + block);
        test[block] = 'X';
        if(!isForkTwo(test)){
          return i;
        }
      }
    }
  }

  // Regular Move
  const nextMove = regularOption(squares);
  if(nextMove!==null){
    return nextMove;
  }

  /*
  // Random option fallback
  for(let i = 0; i < 9; i ++){
    if(squares[i] === null){
      return i;
    }
  }*/

  // buggy code
  return null;
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
  const combinations= [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

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

export default function Board({playerStarts}){
  const [xIsNext, setXIsNext] = useState(playerStarts);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [AIMode, setAIMode] = useState(true);
  const timerRef = useRef(null);

  function resetGame() {
    clearTimeout(timerRef.current);
    setSquares(Array(9).fill(null));
    setXIsNext(playerStarts);
  }

  function handleClick(i){
    if(squares[i] === null && !checkWinner(squares) && !checkDraw(squares) && xIsNext){
      const nextSquares = [... squares];
      
      nextSquares[i] = 'X';

      const status = checkWinner(nextSquares);
      const draw = checkDraw(nextSquares) && !status;

      setSquares(nextSquares);
      setXIsNext(false);
      /*
      if(status || draw){
          return;
      }*/

      //setXIsNext(false); //Edit here, !xIsNext
    }
  }

  useEffect(() => {
  const status = checkWinner(squares);
  const draw = checkDraw(squares) && !status;

  // stop if game is over or it's X's turn
  if (status || draw || xIsNext){
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return;
  }

  timerRef.current = setTimeout(() => {
    const move = chooseMove(squares);

    if (move === null){
      return;
    }
    const aiSquares = [...squares];
    aiSquares[move] = 'O';

    setSquares(aiSquares);
    setXIsNext(true);
  }, 400);

  return () => clearTimeout(timerRef.current);
}, [squares, xIsNext]);

  const status = checkWinner(squares);
  let winner;
  if(status){
    winner = 'Winner: ' + squares[status[0]];
  }else{
    winner = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const draw = checkDraw(squares) && !status;

  return<>
    <div className="background">
      <div className="status">{draw? 'Draw' : winner}</div>
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
      <Reset onResetClick={resetGame} />
    </div>
  </>



}