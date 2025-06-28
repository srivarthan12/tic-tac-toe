import Player from "./components/player"
import GameOver from "./components/GameOver.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer='X'
      if(gameTurns.length>0 && gameTurns[0].player==='X'){
        currentPlayer='O'
      }
      return currentPlayer
}

function App() {
  const [players,setPlayers]=useState({
    X:'Player 1',
    O:'Player 2'
  })

  const[gameTurns,setGameTurns]=useState([])
  //const [activePlayer,setActivePlayer]=useState('X')
  const activePlayer=deriveActivePlayer(gameTurns)
  
  let gameBoard = initialGameBoard.map(row => [...row]);
  
    // Update gameBoard based on turns
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
    
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol
      &&firstSquareSymbol===secondSquareSymbol
      &&firstSquareSymbol===thirdSquareSymbol){
        winner=players[firstSquareSymbol]
      }
  }
  const hasDraw=gameTurns.length===9& !winner;


  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((currActivePLayer)=>currActivePLayer==='X'?'O':'X');
    setGameTurns(prevTurns=>{
      const currentPlayer=deriveActivePlayer(prevTurns)

      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns]
      return updatedTurns
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return  <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player1" symbol="x" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName="Player2" symbol="0" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange} />
      </ol>
      {(winner||hasDraw) &&<GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard
      onSelectSquare={handleSelectSquare} board={gameBoard}
      turns={gameTurns} 
      />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
