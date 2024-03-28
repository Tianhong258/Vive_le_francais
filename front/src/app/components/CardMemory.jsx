import React from 'react'
const HIDDEN_SYMBOL = '❓'

export default function CardMemory({card, index, feedback, onClick}){
    return(
      <div className={`card ${feedback}`} onClick={() => onClick(index)}>
          {feedback === 'hidden'? HIDDEN_SYMBOL : card}
      </div>
    )
  }