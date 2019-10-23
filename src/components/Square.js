import React from 'react'

export default function Square(props) {
    return (
        <div className={`square ${props.value}`} onClick={() => props.handleClick(props.squareId)}
        >
            {props.value}
        </div>
    )
}