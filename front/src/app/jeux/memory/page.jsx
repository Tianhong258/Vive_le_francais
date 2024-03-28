"use client"
import shuffle from 'lodash.shuffle'
import React, { useState, useEffect } from 'react';
import "./page.css"
import CardMemory from "../../components/cardMemory"


const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750


async function getListVocabulaire(){
  try{
    let response = await fetch("http://localhost:3001/api/");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
      console.error("Erreur lors de la récupération de la liste de vocabulaire :", error);
  }
}

function generateCards(){
  const result = []
  const size = SIDE * SIDE
  const candidates = shuffle(SYMBOLS)
  while (result.length < size) {
    const card = candidates.pop()
    result.push(card, card)
  }
  return shuffle(result)
}

let cards = generateCards()

export default function gameFun() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const [ matchedCardIndices, setMatchCardIndices ] = useState([])
  const [ currentPair,setCurrentPair ] = useState([])



  useEffect(() => {
    console.log('État mis à jour :', currentPair);
  }, [currentPair]);

//Vérifier que les cases cliquées et pas matché
//S'il y a déjà 2 cases cliquées, faire rien
//S'il y a pas encore des cases cliquées, mettre l'index de la case qui est venu de cliquée dans le tableau currentPair
//Si les autres cas: 1 case est cliquée: faire handleNewPairClosedBy
function handleCardClick(index) {
  if( !matchedCardIndices.includes(index)){
    if (currentPair.length === 2) {
      return
    }
    if (currentPair.length === 0) {
      setCurrentPair([index])
      return
    }
    handleNewPairClosedBy(index)
  }
}

//Pour vérifier la deuxième case cliquée est match avec la première ou pas
//Si on a pas cliqué la même case que la première fois, on va stoké aussi l'index de cette case dans le tableau currentPair
//et si les deux cases sont pareilles, on va mettre les deux index dans le tableau match
//et dans 750 misecondes, on va initialiser le tableau currentPair
function handleNewPairClosedBy(index) {
  if(index !== currentPair[0]){
    const newPair = [currentPair[0], index]
    const matched = cards[newPair[0]] === cards[newPair[1]]
    setCurrentPair(newPair)
    //setGuesses(guesses + 1)
    if (matched) {
      setMatchCardIndices([...matchedCardIndices, ...newPair])
    }
    //console.log(currentPair)
    setTimeout(() => setCurrentPair([]), VISUAL_PAUSE_MSECS)
  }
}

function getFeedbackForCard(index) {
  const indexMatched = matchedCardIndices.includes(index)
  if (currentPair.length < 2) {
    return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
  }
  if (currentPair.includes(index)) {
    return indexMatched ? 'justMatched' : 'justMismatched'
  }
    return indexMatched ? 'visible' : 'hidden'
} 

return (isClient ? (
  <div className="memory">
  {cards.map((card, index) =>
    <CardMemory
      key={index}
      index={index}
      card={card}
      feedback={getFeedbackForCard(index)}
      onClick={handleCardClick}
    />
  )}
</div>) : null
   )}
  
// return (
//   isClient ? (
//     <div className="memory">
//       {cards?.map((card, index) => (
//         <div
//           className={`card ${getFeedbackForCard(index)}`} // Utilisez la fonction getFeedbackForCard pour obtenir le feedback
//           key={index}
//           index={index}
//           onClick={() => handleCardClick(index)}
//         >
//           {getFeedbackForCard(index) === 'hidden' ? HIDDEN_SYMBOL : card}
//         </div>
//       ))}
//     </div>
//   ) : null
// );
//}



  


