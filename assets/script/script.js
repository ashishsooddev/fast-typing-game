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

const scoreCard = document.getElementById("score-card");

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

function updateTime() {
    time = time - 1;
    timeDisplay.textContent = time;
    if (time <= 0) {
        endGame();
    }
}

input.addEventListener("input", function () {
    let typedWord = input.value.trim();
    let currentCorrectWord = randomWords[index];

    if (typedWord === currentCorrectWord) {
        score = score + 1;
        index = index + 1;
        scoreDisplay.textContent = score;
        input.value = "";
        if (index === words.length) {
            endGame();
        } else {
            showWord();
        }
    }

});

input.onpaste = function () {
    return false;
};

function saveScore(hits, percentage) {
    let scores = [];
    let storedScores = localStorage.getItem("scores");

    if (storedScores !== null) {
        scores = JSON.parse(storedScores);
    }
    let newScore = {
        hits: hits,
        percentage: percentage
    };

    scores.push(newScore);
    scores.sort(function (s, p) {
        return p.hits - s.hits;
    });

    scores.splice(9);
    localStorage.setItem("scores", JSON.stringify(scores));
}

function endGame() {
    clearInterval(timer);
    input.disabled = true;
    music.pause();

    let percentage = ((score / words.length) * 100).toFixed(2);
    currentWord.textContent = "Game Over!";
    finalScore.textContent =
        "Score: " + score +
        " | Accuracy: " + percentage + "%";

    resultSection.classList.remove("hidden");
    
    saveScore(score, percentage);
    displayScores();
}

function displayScores() {

    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scoreCard.innerHTML = "";

    for (let i = 0; i < scores.length; i++) {

        let li = document.createElement("li");

        li.textContent =
            (i + 1) + ". " +
            scores[i].hits + " words - " +
            scores[i].percentage + "%";

        scoreCard.appendChild(li);
    }
}

window.onload = function () {
    displayScores();
};