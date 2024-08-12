/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  document
    .getElementById("generateBtn")
    .addEventListener("click", generateCards);
  document.getElementById("sortBtn").addEventListener("click", sortCards);
};

let cards = [];

function generateCards() {
  let numberOfCards = document.getElementById("cardNumber").value;
  let cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  cards = [];

  for (let i = 0; i < numberOfCards; i++) {
    let card = genCard();
    cards.push(card);
    cardContainer.appendChild(card.element);
  }
}

function genCard() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "K",
    "Q"
  ];
  let suits = ["♦", "♥", "♠", "♣"];
  let suitNames = ["diamond", "heart", "spade", "club"];

  let randomValue = values[Math.floor(Math.random() * values.length)];
  let randomSuitIndex = Math.floor(Math.random() * suits.length);
  let randomSuit = suits[randomSuitIndex];
  let suitName = suitNames[randomSuitIndex];

  let cardElement = document.createElement("div");
  cardElement.classList.add("card", "mx-2");
  cardElement.innerHTML = `
    <div class="suit1 ${suitName}">${randomSuit}</div>
    <div class="value">${randomValue}</div>
    <div class="suit2 ${suitName}">${randomSuit}</div>
  `;

  return {
    value: randomValue,
    suit: randomSuit,
    element: cardElement.cloneNode(true)
  };
}

function sortCards() {
  let changeLog = document.getElementById("changeLog");
  changeLog.innerHTML = "";

  let sortedCards = [...cards];
  let n = sortedCards.length;
  let swapped;
  let step = 1;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (compareCards(sortedCards[i], sortedCards[i + 1]) > 0) {
        [sortedCards[i], sortedCards[i + 1]] = [
          sortedCards[i + 1],
          sortedCards[i]
        ];

        logChange(sortedCards, step);
        step++;

        swapped = true;
      }
    }
    n--;
  } while (swapped);
}

function logChange(cards, step) {
  let changeLog = document.getElementById("changeLog");
  let changeStep = document.createElement("div");
  changeStep.innerHTML = `<strong>Step ${step}:</strong>`;

  let cardContainer = document.createElement("div");
  cardContainer.classList.add("d-flex", "justify-content-center", "mb-3");

  cards.forEach(card => {
    let cardElement = card.element.cloneNode(true);
    cardContainer.appendChild(cardElement);
  });

  changeStep.appendChild(cardContainer);
  changeLog.appendChild(changeStep);
}

function compareCards(card1, card2) {
  const order = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13
  };
  return order[card1.value] - order[card2.value];
}
