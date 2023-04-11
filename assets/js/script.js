/* jshint esversion: 11 */

// this code will run upon loading of the main page
document.addEventListener("DOMContentLoaded", pageSetup());

let gameRunning = false

/**
 * Sets up essential page elements and adds event listeners
 */
function pageSetup() {

    // sets pieces to square 1
    document.getElementById('piece-one').style.gridColumnStart = "1";
    document.getElementById('piece-one').style.gridRowStart = "10";

    document.getElementById('piece-two').style.gridColumnStart = "1";
    document.getElementById('piece-two').style.gridRowStart = "10";

    let startButton = document.getElementById('start-button');

    // start button will run game setup and play background music
    startButton.addEventListener('click', () => {
        gameSetup();
        audioPlay();
    });

    // event listeners
    let twoPlayer = document.getElementById('players');
    twoPlayer.addEventListener('change', formExtend);

    let muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', muteToggle);

    let rulesButton = document.getElementById('rules-button');
    rulesButton.addEventListener('click', rulesPopup);

    let resetConfirm = document.getElementById('reset-confirm');
    resetConfirm.addEventListener('click', () => {
        resetGame();
        resetConfirmClose();
    });

}
/**
 * pops up the rules modal
 */
function rulesPopup() {
    let rulesModal = document.getElementById("rules-container");
    rulesModal.style.display = "block";
    rulesClose(rulesModal);
}

/**
 * sets up both close button and click-outside-window to close the modal 
 */
function rulesClose(rulesModal) {
    let closeButton = document.getElementById("rules-closer");

    closeButton.onclick = function () {
        rulesModal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == rulesModal) {
            rulesModal.style.display = "none";
        }
    };
}

/**
 * pops up the color modal
 */
function colorPopup() {
    let colorModal = document.getElementById("color-alert-container");
    colorModal.style.display = "block";
    colorClose(colorModal);
}

/**
 * sets up both close button and click-outside-window to close the modal 
 */
function colorClose(colorModal) {
    let closeButton = document.getElementById("color-closer");

    closeButton.onclick = function () {
        colorModal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == colorModal) {
            colorModal.style.display = "none";
        }
    };
}

/**
 * pops up the reset modal
 */
function resetPopup() {
    let resetModal = document.getElementById("reset-alert-container");
    resetModal.style.display = "block";
    resetClose(resetModal);
}

/**
 * sets up both close button and click-outside-window to close the modal 
 */
function resetClose(resetModal) {
    let closeButton = document.getElementById("reset-closer");
    let cancelButton = document.getElementById('reset-cancel');

    closeButton.onclick = function () {
        resetModal.style.display = "none";
    };
    cancelButton.onclick = function () {
        resetModal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == resetModal) {
            resetModal.style.display = "none";
        }
    };
}

/**
 * closes the reset modal
 */
function resetConfirmClose() {
    let resetModal = document.getElementById("reset-alert-container");
    resetModal.style.display = "none";
}

/**
 * Pops up the 'You Win' message
 */
function winAlertYou() {
    let winModal = document.getElementById("win-alert-container");
    winModal.style.display = "block";
    winModal.innerHTML =
        `
        <div id="win-alert-content">
            <span id="win-closer" class="close">&times;</span>
            <h2 class="bounce">
                <span>Y</span>
                <span>o</span>
                <span>u</span>
                <span class="space">-</span>
                <span>W</span>
                <span>i</span>
                <span>n</span>
                <span>!</span>
            </h2>
        </div>
    `;
    winClose(winModal);
}

/**
 * Pops up the 'Player One Wins' message
 */
function winAlertOne() {
    let winModal = document.getElementById("win-alert-container");
    winModal.style.display = "block";
    winModal.innerHTML =
        `
        <div id="win-alert-content">
            <span id="win-closer" class="close">&times;</span>
            <h2 class="bounce">
                <span>P</span>
                <span>l</span>
                <span>a</span>
                <span>y</span>
                <span>e</span>
                <span>r</span>
                <span class="space">-</span>
                <span>O</span>
                <span>n</span>
                <span>e</span>
                <span class="space">-</span>
                <span>W</span>
                <span>i</span>
                <span>n</span>
                <span>s</span>
                <span>!</span>
            </h2>
        </div>
    `;
    winClose(winModal);
}

/**
 * Pops up the 'Player Two Wins' message
 */
function winAlertTwo() {
    let winModal = document.getElementById("win-alert-container");
    winModal.style.display = "block";
    winModal.innerHTML =
        `
        <div id="win-alert-content">
            <span id="win-closer" class="close">&times;</span>
            <h2 class="bounce">
                <span>P</span>
                <span>l</span>
                <span>a</span>
                <span>y</span>
                <span>e</span>
                <span>r</span>
                <span class="space">-</span>
                <span>T</span>
                <span>w</span>
                <span>o</span>
                <span class="space">-</span>
                <span>W</span>
                <span>i</span>
                <span>n</span>
                <span>s</span>
                <span>!</span>
            </h2>
        </div>
    `;
    winClose(winModal);
}

/**
 * Pops up the 'Computer Wins' message
 */
function winAlertBot() {
    let winModal = document.getElementById("win-alert-container");
    winModal.style.display = "block";
    winModal.innerHTML =
        `
        <div id="win-alert-content">
            <span id="win-closer" class="close">&times;</span>
            <h2 id="computer-win-message">
            <span class="material-symbols-outlined botface">
                        smart_toy
                    </span>
             Computer Wins 
            <span class="material-symbols-outlined botface">
                        smart_toy
                    </span>
            </h2>
        </div>
    `;
    winClose(winModal);
}

/**
 * sets up both close button and click-outside-window to close the modal 
 */
function winClose(winModal) {
    let closeButton = document.getElementById("win-closer");

    closeButton.onclick = function () {
        winModal.style.display = "none";
        resetGame();
    };
    window.onclick = function (event) {
        if (event.target == winModal) {
            winModal.style.display = "none";
            resetGame();
        }
    };
}

/**
 * Starts background music upon starting the game
 */
function audioPlay() {
    let backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.paused) { //checks if audio is playing
        backgroundMusic.play();
    }
}

/**
 * Mutes all audio. If already muted, unmutes all audio.
 */
function muteToggle() {
    let backgroundMusic = document.getElementById('background-music');
    let rollSound = document.getElementById('roll-sound');
    let ladderSound = document.getElementById('ladder-sound');
    let snakeSound = document.getElementById('snake-sound');
    let winSound = document.getElementById('win-sound');
    if (backgroundMusic.muted != true) {
        backgroundMusic.muted = true;
        rollSound.muted = true;
        ladderSound.muted = true;
        snakeSound.muted = true;
        winSound.muted = true;
        document.getElementById('mute-button').innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    } else {
        backgroundMusic.muted = false;
        rollSound.muted = false;
        ladderSound.muted = false;
        snakeSound.muted = false;
        winSound.muted = false;
        document.getElementById('mute-button').innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
}

/**
 * Extends the game setup form to allow player 2
 * to pick a color, if a 2-player game is selected
 */
function formExtend() {
    if (document.getElementById('players').value == 2) {
        document.getElementById('color-container').innerHTML =
            `
        <div id="color-container">
            <p>Pick your colors!</p>
            <label for="color-one">Player One</label>
            <select id="color-one" name="color-one">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
            </select>
            <br>
            <label for="color-two">Player Two</label>
            <select id="color-two" name="color-two">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
            </select>
        </div>
                        
    `;
    } else {
        document.getElementById('color-container').innerHTML =
            `
        <div id="color-container">
            <p>Pick your color!</p>
            <label for="color-one">Player One</label>
            <select id="color-one" name="color-one">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
            </select>
        </div>
    `;
    }
}

/**
 * Sets up game. logs number of players. Sets player colors.
 * If 2-player game, runs color check function 
 */
function gameSetup() {
    let players = document.getElementById('players').value;
    let colorOne = document.getElementById('color-one').value;
    if (document.getElementById('color-two')) {
        let colorTwo = document.getElementById('color-two').value;

        let pieceTwo = document.getElementById('piece-two');
        pieceTwo.style.backgroundColor = colorTwo;

        let pieceTwoSmooth = document.getElementById('piece-two-smooth');
        pieceTwoSmooth.style.backgroundColor = colorTwo;
    } else {}
    let pieceOne = document.getElementById('piece-one');
    pieceOne.style.backgroundColor = colorOne;

    let pieceOneSmooth = document.getElementById('piece-one-smooth');
    pieceOneSmooth.style.backgroundColor = colorOne;

    if (players == 2) {
        colorChecker(players);
    } else {
        let computerPiece = document.getElementById('piece-two');
        computerPiece.style.backgroundColor = 'grey';
        let pieceTwoSmooth = document.getElementById('piece-two-smooth');
        pieceTwoSmooth.style.backgroundColor = 'grey';
        document.getElementById('robot-icon').style.color = 'black';
        runGame(players);
    }
}

/**
 * Checks if the 2 players have picked the same color,
 * if so, pops up the color alert modal.
 * if not, begins the run game function.
 */
function colorChecker(players) {
    let colorOne = document.getElementById('color-one').value;
    let colorTwo = document.getElementById('color-two').value;
    if (colorOne == colorTwo) {
        colorPopup();
    } else {
        runGame(players);
    }
}

/**
 * Main game run function - takes number of players as a parameter.
 * Rewrites HTML to replace form elements with dice elements.
 * Sets up audio elements. Picks first turn.
 * Takes computer turns.
 */
function runGame(players) {
    let gameRunning = true;

    document.getElementById('rules-button-container').innerHTML = ``;

    document.getElementById('roll-container').innerHTML =
        `
    <button id="dice-roller">Roll</button>
    `;
    document.getElementById('dice-container').innerHTML =
        `
    <div class="dice">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
        <div class="face right"></div>
        <div class="face left"></div>
    </div>
    `;
    document.getElementById('dice-result-container').innerHTML =
        `
    <div id="result-one">
            <p></p>
        </div>
        <div id="result-two">
            <p></p>
        </div>
    `;

    let diceRoller = document.getElementById('dice-roller');

    diceRoller.addEventListener('click', rollDice);

    document.getElementById('form-container').innerHTML =
        ``;
    document.getElementById('form-container').style.padding = 0;

    let backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.muted != true) {
        document.getElementById('reset-mute-container').innerHTML =
            `
        <div id="reset-container">
            <button id="reset-button">Reset Game</button>
        </div>
        <div id="mute-container">
            <button id="mute-button"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        `;
    } else {
        document.getElementById('reset-mute-container').innerHTML =
            `
        <div id="reset-container">
            <button id="reset-button">Reset Game</button>
        </div>
        <div id="mute-container">
            <button id="mute-button"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>
        `;
    }

    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetPopup);

    let muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', muteToggle);

    // sound effects
    let rollSound = document.getElementById('roll-sound');
    let ladderSound = document.getElementById('ladder-sound');
    let snakeSound = document.getElementById('snake-sound');
    let winSound = document.getElementById('win-sound');

    let turn = Math.floor(Math.random() * 2) + 1;

    if (players == 2) {
        document.getElementById('game-messages').innerText = (`Player ${turn} goes first`);
        if (turn == 1) {
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor;
        } else {
            document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor;
        }
    } else {
        if (turn == 1) {
            document.getElementById('game-messages').innerText = (`You go first!`);
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor;
        } else {
            if (gameRunning === true) {
                document.getElementById('game-messages').innerText = ('Computer goes first');
                disableButtons();
                document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor;
                diceNum = Math.floor(Math.random() * 6) + 1;
                setTimeout(function () {
                    movePieceTwo(diceNum);
                    // diplays the computer's 'roll' to the user
                    if (diceNum == 1) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-one"></i>`;
                    } else if (diceNum == 2) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-two"></i>`;
                    } else if (diceNum == 3) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-three"></i>`;
                    } else if (diceNum == 4) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-four"></i>`;
                    } else if (diceNum == 5) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-five"></i>`;
                    } else if (diceNum == 6) {
                        document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-six"></i>`;
                    }


                }, 500);
            }
        }
    }


    /**
     * 'Rolls' the dice. generates a random dice number.
     * Logs it. Plays the roll animation. Triggers functions to
     * move player pieces
     */
    function rollDice() {

        rollSound.play();

        let diceNum = Math.floor(Math.random() * 6) + 1;
        disableButtons();

        let dice = document.querySelector('.dice');

        dice.style.animation = 'rolling 2.5s';

        document.getElementById('result-two').innerText = ``;

        setTimeout(() => {

            switch (diceNum) {
                case 1:
                    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    break;

                case 6:
                    dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                    break;

                case 2:
                    dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                    break;

                case 5:
                    dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                    break;

                case 3:
                    dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                    break;

                case 4:
                    dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                    break;

                default:
                    break;
            }

            dice.style.animation = 'none';

        }, 1050);

        setTimeout(function () {
            if (players == 2) {
                if (turn == 1) {
                    movePieceOne(diceNum);
                } else {
                    movePieceTwo(diceNum);
                }
            } else {
                if (turn == 1) {
                    movePieceOne(diceNum);
                    diceNum = Math.floor(Math.random() * 6) + 1;

                    setTimeout(function () {
                        if (gameRunning === true) {
                            movePieceTwo(diceNum);
                            if (diceNum == 1) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-one"></i>`;
                            } else if (diceNum == 2) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-two"></i>`;
                            } else if (diceNum == 3) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-three"></i>`;
                            } else if (diceNum == 4) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-four"></i>`;
                            } else if (diceNum == 5) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-five"></i>`;
                            } else if (diceNum == 6) {
                                document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-six"></i>`;
                            }
                        }
                    }, 1500);
                }
            }
        }, 1500);
    }

    /**
     * Alernates the turn state after player or
     * computer has taken their turn.
     */
    function switchTurn() {
        if (gameRunning === true) {
            if (turn == 1) {
                turn = turn + 1;
                if (players == 2) {
                    document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`;
                    document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor;
                    enableButtons();


                } else {
                    document.getElementById('game-messages').innerText = `Computer's Turn`;
                    document.getElementById('game-messages').style.color = 'grey';

                }

            } else {
                turn = turn - 1;
                if (players == 2) {
                    document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`;
                    document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor;
                    enableButtons();
                } else {
                    document.getElementById('game-messages').innerText = `Your Turn!`;
                    document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor;
                    enableButtons();
                }

            }
        }
    }

    /**
     * Moves player one's real (invisible) piece 
     * along the board and checks if player has won.
     * Calls functions to update visible player piece,
     * as well as check if on a 'special' square
     */
    function movePieceOne(diceNum) {
        let pieceOne = document.getElementById('piece-one');
        // checks if piece is within one roll of finishing
        if (parseInt(pieceOne.style.gridRowStart) === 1 && parseInt(pieceOne.style.gridColumnStart) <= 7) {
            // checks if piece has won
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum == 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum;
                winSound.play();
                gameRunning = false;
                setTimeout(function () {
                    if (players == 2) {
                        winAlertOne();
                    } else {
                        winAlertYou();
                    }
                }, 700);


            } else if (parseInt(pieceOne.style.gridColumnStart) - diceNum > 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum;
            }

            // moves piece if on an even-numbered row
        } else if (pieceOne.style.gridRowStart % 2 === 0) {
            let PositionEvenOne = pieceOne.style.gridColumnStart;
            let magicNumEvenOne = 11 - PositionEvenOne;
            pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + diceNum;
            if (pieceOne.style.gridColumnStart > 10) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - 10;
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart);
                let modifierEvenOne = diceNum - magicNumEvenOne;
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + modifierEvenOne;

                // moves piece smoothly around corners
                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) + 1;
                    updatePieceOneSmooth();
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
                    updatePieceOneSmooth();
                }, 400);

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - modifierEvenOne;
                    updatePieceOneSmooth();
                }, 700);
            }

            // moves piece if on an odd-numbered row
        } else if (pieceOne.style.gridRowStart % 2 != 0) {
            let positionOddOne = pieceOne.style.gridColumnStart;
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum < 0) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum;
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + 10;
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart);
                let modifierOddOne = diceNum - positionOddOne;
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - modifierOddOne;

                // moves piece smoothly around corners
                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) + 1;
                    updatePieceOneSmooth();
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
                    updatePieceOneSmooth();
                }, 400);

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + modifierOddOne;
                    updatePieceOneSmooth();
                }, 700);


            } else if (pieceOne.style.gridColumnStart == 1 && diceNum == 1) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
            } else if (pieceOne.style.gridColumnStart - diceNum == 0) {

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = 1;
                    updatePieceOneSmooth();
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1;
                    updatePieceOneSmooth();
                }, 400);
            } else {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum;
            }
        }

        updatePieceOneSmooth();
        setTimeout(function () {
            specialCheckOne(pieceOne);
        }, 1000);

    }

    /**
     * Checks if player one is on a snake or
     * a ladder and, if so, moves the piece.
     * Calls functions to update pseudo-piece and
     * switch the turn
     */
    function specialCheckOne(pieceOne) {

        // snake and ladder squares
        if (pieceOne.style.gridColumnStart == 4 && pieceOne.style.gridRowStart == 10) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 5;
            pieceOne.style.gridRowStart = 8;
        } else if (pieceOne.style.gridColumnStart == 1 && pieceOne.style.gridRowStart == 8) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 2;
            pieceOne.style.gridRowStart = 7;
        } else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 8) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 7;
            pieceOne.style.gridRowStart = 3;
        } else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 8) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 7;
            pieceOne.style.gridRowStart = 10;
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 6) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 5;
            pieceOne.style.gridRowStart = 3;
        } else if (pieceOne.style.gridColumnStart == 7 && pieceOne.style.gridRowStart == 6) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6;
            pieceOne.style.gridRowStart = 9;
        } else if (pieceOne.style.gridColumnStart == 5 && pieceOne.style.gridRowStart == 5) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 2;
            pieceOne.style.gridRowStart = 9;
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 4) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 1;
            pieceOne.style.gridRowStart = 3;
        } else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 3) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 9;
            pieceOne.style.gridRowStart = 2;
        } else if (pieceOne.style.gridColumnStart == 8 && pieceOne.style.gridRowStart == 3) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 10;
            pieceOne.style.gridRowStart = 5;
        } else if (pieceOne.style.gridColumnStart == 2 && pieceOne.style.gridRowStart == 2) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 2;
            pieceOne.style.gridRowStart = 6;
        } else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 1) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6;
            pieceOne.style.gridRowStart = 3;
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 1) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6;
            pieceOne.style.gridRowStart = 5;
        }
        updatePieceOneSmooth();

        if (gameRunning === true) {
            switchTurn();
        }
    }

    /**
     * Moves player two's real (invisible) piece 
     * along the board and checks if player has won.
     * Calls functions to update visible player piece,
     * as well as check if on a 'special' square
     */
    function movePieceTwo(diceNum) {
        let pieceTwo = document.getElementById('piece-two');
        // checks if piece is within one roll of finishing
        if (parseInt(pieceTwo.style.gridRowStart) === 1 && parseInt(pieceTwo.style.gridColumnStart) <= 7) {
            // checks if piece has won
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum == 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum;
                if (players == 2) {
                    winSound.play();
                    gameRunning = false;
                    setTimeout(function () {
                        winAlertTwo();
                    }, 700);
                } else {
                    gameRunning = false;
                    setTimeout(function () {
                        winAlertBot();
                    }, 700);

                }
            } else if (parseInt(pieceTwo.style.gridColumnStart) - diceNum > 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum;
            }
            // moves piece on even numbered rows
        } else if (pieceTwo.style.gridRowStart % 2 === 0) {
            let PositionEvenTwo = pieceTwo.style.gridColumnStart;
            let magicNumEvenTwo = 11 - PositionEvenTwo;
            pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + diceNum;
            if (pieceTwo.style.gridColumnStart > 10) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - 10;
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart);
                let modifierEvenTwo = diceNum - magicNumEvenTwo;
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + modifierEvenTwo;

                // moves piece smoothly around corners
                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) + 1;
                    updatePieceTwoSmooth();
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
                    updatePieceTwoSmooth();
                }, 400);

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - modifierEvenTwo;
                    updatePieceTwoSmooth();
                }, 700);
            }


            // moves piece on odd numbered rows
        } else if (pieceTwo.style.gridRowStart % 2 != 0) {
            let positionOddTwo = pieceTwo.style.gridColumnStart;
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum < 0) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum;
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + 10;
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart);
                let modifierOddTwo = diceNum - positionOddTwo;
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - modifierOddTwo;

                // moves piece smoothly around corners
                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) + 1;
                    updatePieceTwoSmooth();
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
                    updatePieceTwoSmooth();
                }, 400);

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + modifierOddTwo;
                    updatePieceTwoSmooth();
                }, 700);


            } else if (pieceTwo.style.gridColumnStart == 1 && diceNum == 1) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
            } else if (pieceTwo.style.gridColumnStart - diceNum == 0) {

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = 1;
                    updatePieceTwoSmooth();
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1;
                    updatePieceTwoSmooth();
                }, 400);
            } else {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum;
            }
        }

        updatePieceTwoSmooth();
        setTimeout(function () {
            specialCheckTwo(pieceTwo);
        }, 1000);
    }

    /**
     * Checks if player two is on a snake or
     * a ladder and, if so, moves the piece.
     * Calls functions to update pseudo-piece and
     * switch the turn
     */
    function specialCheckTwo(pieceTwo) {

        // snake and ladder squares
        if (pieceTwo.style.gridColumnStart == 4 && pieceTwo.style.gridRowStart == 10) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 5;
            pieceTwo.style.gridRowStart = 8;
        } else if (pieceTwo.style.gridColumnStart == 1 && pieceTwo.style.gridRowStart == 8) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 2;
            pieceTwo.style.gridRowStart = 7;
        } else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 8) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 7;
            pieceTwo.style.gridRowStart = 3;
        } else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 8) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 7;
            pieceTwo.style.gridRowStart = 10;
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 6) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 5;
            pieceTwo.style.gridRowStart = 3;
        } else if (pieceTwo.style.gridColumnStart == 7 && pieceTwo.style.gridRowStart == 6) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6;
            pieceTwo.style.gridRowStart = 9;
        } else if (pieceTwo.style.gridColumnStart == 5 && pieceTwo.style.gridRowStart == 5) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 2;
            pieceTwo.style.gridRowStart = 9;
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 4) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 1;
            pieceTwo.style.gridRowStart = 3;
        } else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 3) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 9;
            pieceTwo.style.gridRowStart = 2;
        } else if (pieceTwo.style.gridColumnStart == 8 && pieceTwo.style.gridRowStart == 3) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 10;
            pieceTwo.style.gridRowStart = 5;
        } else if (pieceTwo.style.gridColumnStart == 2 && pieceTwo.style.gridRowStart == 2) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 2;
            pieceTwo.style.gridRowStart = 6;
        } else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 1) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6;
            pieceTwo.style.gridRowStart = 3;
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 1) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6;
            pieceTwo.style.gridRowStart = 5;
        }
        updatePieceTwoSmooth();
        switchTurn();
    }
}

/**
 * Updates player one's pseudo (visible) piece.
 * Gets the position of the real (invisible) piece
 * and moves the psudo piece to the same location.
 */
function updatePieceOneSmooth() {
    let pieceOneSmooth = document.getElementById('piece-one-smooth');
    let element = document.getElementById("piece-one");
    let leftPosition = element.offsetLeft;
    let topPosition = element.offsetTop;

    let leftPositionCorrected = leftPosition - 0;
    let topPositionCorrected = topPosition - 0;

    pieceOneSmooth.style.left = `${leftPositionCorrected}px`;
    pieceOneSmooth.style.top = `${topPositionCorrected}px`;
}

/**
 * Updates player two's pseudo (visible) piece.
 * Gets the position of the real (invisible) piece
 * and moves the psudo piece to the same location.
 */
function updatePieceTwoSmooth() {
    let pieceTwoSmooth = document.getElementById('piece-two-smooth');
    let element = document.getElementById("piece-two");
    let leftPosition = element.offsetLeft;
    let topPosition = element.offsetTop;

    let leftPositionCorrected = leftPosition - 0;
    let topPositionCorrected = topPosition - 0;

    pieceTwoSmooth.style.left = `${leftPositionCorrected}px`;
    pieceTwoSmooth.style.top = `${topPositionCorrected}px`;
}

/**
 * Resets the game. Reverts HTML elements to their
 * initial state, and moves pieces back to square 1.
 * Re-runs the page setup function
 */
function resetGame() {
    gameRunning = false;

    // keeps the audio mute state in it's current state, despite game reset.
    let backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.muted != true) {
        document.getElementById('rules-button-container').innerHTML = `<button id="rules-button">How To Play</button>`;
        document.getElementById('form-container').innerHTML =
            ` <form class="form" action=>
                <div id="form-title">Game Setup</div>
                <div id="radio-container">
                    <div>
                        <label for="players">How many players?</label>
                        <select id="players" name="players">
                            <option id="one-player" value="1">1</option>
                            <option id="two-player" value="2">2</option>
                        </select>
                    </div>
                    <div id="color-container">
                        <p>Pick your color!</p>
                        <label for="color-one">Player One</label>
                        <select id="color-one" name="color-one">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
            </form>
            <div id="start-mute-container">
                <div id="start-container">
                    <button id="start-button">Start Game!</button>
                </div>
                <div id="mute-container">
                    <button id="mute-button"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    `;
    } else {
        document.getElementById('rules-button-container').innerHTML = `<button id="rules-button">How To Play</button>`;
        document.getElementById('form-container').innerHTML =
            ` <form class="form" action=>
                <div id="form-title">Game Setup</div>
                <div id="radio-container">
                    <div>
                        <label for="players">How many players?</label>
                        <select id="players" name="players">
                            <option id="one-player" value="1">1</option>
                            <option id="two-player" value="2">2</option>
                        </select>
                    </div>
                    <div id="color-container">
                        <p>Pick your color!</p>
                        <label for="color-one">Player One</label>
                        <select id="color-one" name="color-one">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
            </form>
            <div id="start-mute-container">
                <div id="start-container">
                    <button id="start-button">Start Game!</button>
                </div>
                <div id="mute-container">
                    <button id="mute-button"><i class="fa-solid fa-volume-xmark"></i></button>
                </div>
            </div>
    `;
    }
    // HTML elements reset
    document.getElementById('roll-container').innerHTML = ``;
    document.getElementById('dice-container').innerHTML = ``;
    document.getElementById('reset-mute-container').innerHTML = ``;
    document.getElementById('game-messages').innerHTML = ``;
    document.getElementById('result-two').innerText = ``;
    document.getElementById('robot-icon').style.color = 'transparent';
    setTimeout(function () {
        document.getElementById('result-two').innerText = ``;
    }, 2000);

    pageSetup();
    updatePieceOneSmooth();
    updatePieceTwoSmooth();
}

/**
 * Disables roll and reset buttons
 */
function disableButtons() {

    document.getElementById("dice-roller").disabled = true;
    document.getElementById("reset-button").disabled = true;
}

/**
 * Enables roll and reset buttons
 */
function enableButtons() {

    document.getElementById("dice-roller").disabled = false;
    document.getElementById("reset-button").disabled = false;
}