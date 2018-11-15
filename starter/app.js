/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores,
    roundScore,
    activePlayer,
    gamePlaying = true;

function init() {


    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    let player0Score = document.querySelector('#score-0');
    let player1Score = document.querySelector('#score-1');
    let player0Current = document.querySelector('#current-0');
    let player1Current = document.querySelector('#current-1');

    player0Score.textContent = '0';
    player1Score.textContent = '0';
    player0Current.textContent = '0';
    player1Current.textContent = '0';

    document.querySelector('.dice').style.display = 'none';
}
init();




document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', init);

// Roll dice 
function rollDice(e) {
    if(gamePlaying) {
        let dice = Math.ceil(Math.random() * 6);
        let diceImg = document.querySelector('.dice');
        
        diceImg.setAttribute('src', `dice-${dice}.png`);
        diceImg.style.display = `block`;
    
        if(dice !== 1) {
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = `${roundScore}`;
        } else {
            // Change active player
            nextPlayer();
        }
    }
    
}

// Hold turn
function hold(e) {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.dice`).style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    } 
}

// Switch to the next player
function nextPlayer() {
    if(activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    roundScore = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    diceImg.style.display = 'none';
}