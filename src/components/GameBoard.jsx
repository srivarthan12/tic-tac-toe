// GameBoard.jsx

  export default function GameBoard({ onSelectSquare, board }) {
    // Create a deep copy of initialGameBoard to avoid mutating the original
    
    // const[GameBoard,setGameBoard]=useState(intialGameBoard)
    
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
    //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol
    //         return updatedBoard
    //     })
    //     onSelectSquare();
    // }
    return (
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null} // Disable button if square is already filled
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }