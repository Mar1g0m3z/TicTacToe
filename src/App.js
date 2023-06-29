import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <p className="description">Welcome to the Tic-Tac-Toe game!</p>
      <Link to="/game" className="start-button">
        Start Game
      </Link>
    </div>
  );
};

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (currentBoard) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderCell = (index) => {
    const symbol = board[index];
    const cellClass = symbol === "X" ? "cell-x" : "cell-o";
    return (
      <div
        className={`cell ${cellClass}`}
        onClick={() => handleCellClick(index)}
      >
        {symbol}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="board">
        <div className="row">
          <div className="cell-container">{renderCell(0)}</div>
          <div className="cell-container">{renderCell(1)}</div>
          <div className="cell-container">{renderCell(2)}</div>
        </div>
        <div className="row">
          <div className="cell-container">{renderCell(3)}</div>
          <div className="cell-container">{renderCell(4)}</div>
          <div className="cell-container">{renderCell(5)}</div>
        </div>
        <div className="row">
          <div className="cell-container">{renderCell(6)}</div>
          <div className="cell-container">{renderCell(7)}</div>
          <div className="cell-container">{renderCell(8)}</div>
        </div>
      </div>
      {winner && <p className="winner">Winner: {winner}</p>}
      {!winner && <p className="player">Current Player: {currentPlayer}</p>}
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
};

export default App;
