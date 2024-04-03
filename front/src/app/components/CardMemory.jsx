"use client"

import React, { useState, useEffect } from 'react'
const HIDDEN_SYMBOL = '❓'

export default function CardMemory({card, index, feedback, onClick}){
  const [isClient, setIsClient] =useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


    return(
      <div className={`card ${feedback}`} onClick={() => onClick(index)}>
          {feedback === 'hidden'? HIDDEN_SYMBOL : card}
      </div>
    )
  }