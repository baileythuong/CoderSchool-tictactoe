import React from 'react'
import Square from "../components/Square";

export default function Board(props) {

    const handleClick = (squareId) => {
        if (props.gameOver) return
        let board = props.board.slice();
        let check = board.filter(element => !element)
        if (!board[squareId]) board[squareId] = check.length % 2 ? "X" : "O";
        if (board.filter(element => !element).length === 0)
        props.setGameOver(true);
        props.setBoard(board);

        if(setWinner(board)) {
            props.setWon(setWinner(board));
            props.setGameOver(true);
        }
    }
    
    return (
        <div className="board">
            {
            props.board.map((element, index) => {
            return <Square key={index} value={element} squareId={index} handleClick={handleClick}/>
            })
            }
        </div>
    )
}

const setWinner = (board) => {
    const possibleWinningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
    ]
    for (let i = 0; i < possibleWinningCases.length; i++) {
        let [a, b, c] = possibleWinningCases[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a]
    }
    return null
}
