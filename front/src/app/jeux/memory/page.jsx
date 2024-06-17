"use client"
import shuffle from 'lodash.shuffle'
import React, { useState, useEffect } from 'react';
import "./page.css"
import CardMemory from "../../components/cardMemory"
import NavBar from "../../components/NavBar";


const SIDE = 4
const VISUAL_PAUSE_MSECS = 750

//obtenir la liste de vocabulaire de l'utilisateur
async function getListVocabulaire() {
  try {
    let response = await fetch("http://localhost:3001/api/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste de vocabulaire :", error);
  }
}
//obtenir la liste de mots qui va être utilisée dans le jeu et générer les cartes
let listMots = []

function getCards(getData) {
  let size = SIDE * SIDE
  if (getData.length > 0) {
    const dataShuffle = shuffle(getData)
    if (getData.length < size / 2) {
      size = getData.length * 2
    }
    while (listMots.length < size / 2) {
      let card = dataShuffle.pop()
      listMots.push(card)
    }
  }
  const candidates = []
  listMots.forEach((mot) => {
    candidates.push(mot.fr)
    candidates.push(mot.jeux)
  })
  return (shuffle(candidates))
}


export default function gameFun() {
  const [isClient, setIsClient] = useState(false)
  const [cards, setCards] = useState([])
  const [matchedCardIndices, setMatchCardIndices] = useState([])
  const [currentPair, setCurrentPair] = useState([])

  //après le premier rendu de la page, exécuter les fonctions qui générent le jeu pour obtenir les cartes de cette partie
  useEffect(() => {
    if (!isClient) {
      setIsClient(true)
    }
    async function generateCards() {
      const getData = await getListVocabulaire()
      const jeu = getCards(getData)
      setCards(jeu)
    }
    //s'il y a une liste de vocabulaire dans la base de donne, générer la liste de vocabulaire qui va être utiliser dans le jeu

    generateCards()
  }, []);

  //contrôle quand on clicke sur une carte
  //avoir les effets seulement quand la carte n'est pas matché:
  //S'il y a déjà 2 cartes cliquées, faire rien
  //S'il y a pas encore de carte cliquée, mettre l'index de la carte qui est venue d'être cliquée dans le tableau currentPair
  //S'il y a déjà une carte est cliquée: appeler la fonction handleNewPairClosedBy
  function handleCardClick(index) {
    if (!matchedCardIndices.includes(index)) {
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

  //Fonction pour contrôler le cas où la deuxième carte est cliquée
  //Si on n'a pas cliqué la même case que la première fois, on va stocker aussi l'index de cette carte dans le tableau currentPair
  //Si les deux cartes partagent le même id dans la base de donnée(les deux cartes sont matchés),
  //on va mettre les deux index dans le tableau matché
  //et dans 750 misecondes, initialiser le tableau currentPair
  function handleNewPairClosedBy(index) {
    if (index !== currentPair[0]) {
      const newPair = [currentPair[0], index]
      const matched = listMots.find(mot => mot.fr == cards[newPair[0]] && mot.jeux == cards[newPair[1]]) || listMots.find(mot => mot.fr == cards[newPair[1]] && mot.jeux == cards[newPair[0]])
      setCurrentPair(newPair)
      if (matched) {
        setMatchCardIndices([...matchedCardIndices, ...newPair])
      }
      setTimeout(() => setCurrentPair([]), VISUAL_PAUSE_MSECS)
    }
  }

  //Fonction pour contrôler l'apparence des cartes(face caché ou face visible)
  //Si seulement une ou moins de carte est cliquée 
  //et la carte est matchée ou c'est la carte est la première carte cliquée
  //mettre cette carte visible, sinon le cacher 
  //Si deux carte sont cliqué et la carte est l'une des deux, selon qu'elle vient d'être matchée ou pas
  //change la couleur de bord en verte/rouge
  //Si les autres cas, si la carte est déjà matchée, rester en visible, sinon rester en cachée 
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

  const won = matchedCardIndices.length === cards.length
  //todo : la position du board de jeu
  return (isClient ? (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='memory-container'>
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
          {won && "Vous avez gagnez ! Félicitation !"}
        </div>
      </div>
    </div>) : null
  )
}






