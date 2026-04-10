"use strict";

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
     'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
     'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
     'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 
     'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
     'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty',
     'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge',
     'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond',
     'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery',
     'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery',
     'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language',
     'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge',
     'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet',
     'software', 'update', 'yellow', 'keyboard', 'window'];

const timeDisplay = document.getElementById("time-display");
const scoreDisplay = document.getElementById("score-display");
const currentWord = document.getElementById("current-word");
const input = document.getElementById("word-input");

const startBtn = document.getElementById("start-button");
const resultSection = document.getElementById("result-section");
const finalScore = document.getElementById("final-score");
const music = document.getElementById("game-music");

function shuffle(arr) {
    let newArray = [...arr];

    for (let i = newArray.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = newArray[i];
        newArray[i] = newArray[randomIndex];
        newArray[randomIndex] = temp;
    }

    return newArray;
}

class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    getDate() { return this.#date; }
    getHits() { return this.#hits; }
    getPercentage() { return this.#percentage; }
}

let randomWords = [];
let index = 0;
let score = 0;
let time = 99;
let timer;

function startGame() {
    randomWords = shuffle([...words]);
    index = 0;
    score = 0;
    time = 99;

    input.disabled = false;
    input.value = "";
    input.focus();

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    resultSection.classList.add("hidden");

    showWord();

    clearInterval(timer);
    timer = setInterval(updateTime, 1000);

    music.currentTime = 0;
    music.play();
}

startBtn.addEventListener("click", startGame);

function showWord() {
    currentWord.textContent = randomWords[index];
}