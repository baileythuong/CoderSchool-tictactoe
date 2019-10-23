import React, {useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from 'react-facebook-login';

import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [highScore, setHighScore] = useState([]);

  // console.log('abc', won);

  const responseFacebook = (response) => {
    console.log(response);
    setLoggedIn(
      {name: response.name,
      email: response.email
      }
    );
  }

  const logOut = (response) => {
    setLoggedIn(false);
  }

  const getPlayerData = async() => {
  const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  setHighScore(data.items)
  }

  const postPlayerData = async() => {
    let data = new URLSearchParams();
    data.append("player", "Thuong");
    data.append("score", "-1e+278");
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString(),
    });
    const res = await response.json();
    console.log(res);
  
    setHighScore(data.items)
    }

  useEffect(() => {
    getPlayerData();
    postPlayerData();
    }, [])
  
  
  return (
    <div className="d-flex">
      { !loggedIn ?
      <FacebookLogin
      appId="1355341577966477"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="mx-2 mt-2 btn btn-lg btn-primary"
      icon="fa-facebook"
      />
      : <>
    <div className="container pt-5 ml-5">
      <Board
        board={board}
        setBoard={setBoard}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setWon={setWon}
      />
    <p className="lead pt-2">
      {gameOver ? (won ? `Game over, winner is ${won}!` : `Game over, it's a draw!`) : ``}
    </p>
    </div>
    <div className="container pt-5">
    <button className="btn btn-lg btn-info" type="submit" onClick={resetGame}>Reset</button>
    <button className="btn btn-lg btn-danger mx-2" onClick={() => logOut()}>Logout</button>
    <ul className="list-group mt-2">
        {highScore && highScore.map((element) => 
            <li className="list-group-item d-flex justify-content-between align-items-center">
            {element.player}
            <span className="badge badge-warning badge-pill">{element.score}</span>
          </li>
        )}
    </ul>
    </div>
      </>}
    </div>
  );
}

function resetGame(){ 
  window.location.reload(); 
}

export default App;
