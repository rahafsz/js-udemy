const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer;
const init = () => {
    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    current1El.textContent = 0;
    current0El.textContent = 0;
    btnHold.disabled = false;
    btnRoll.disabled = false;
    diceEl.classList.add("hidden");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
};
init();
const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${diceNum}.png`;
    if (diceNum !== 1) {
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        switchPlayer();
    }
});
btnHold.addEventListener("click", () => {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (scores[activePlayer] >= 5) {
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
        diceEl.classList.add("hidden");
        btnHold.disabled = true;
        btnRoll.disabled = true;
    } else {
        switchPlayer();
    }
});

btnNew.addEventListener("click", init);
