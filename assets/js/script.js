/* jshint esversion: 11 */

document.addEventListener("DOMContentLoaded", pageSetup())

function pageSetup() {
    document.getElementById('piece-one').style.gridColumnStart = "1";
    document.getElementById('piece-one').style.gridRowStart = "10";

    document.getElementById('piece-two').style.gridColumnStart = "1";
    document.getElementById('piece-two').style.gridRowStart = "10";

    let startButton = document.getElementById('start-button')

    startButton.addEventListener('click', () => {
        gameSetup();
        audioPlay();
    });

    let twoPlayer = document.getElementById('players')
    twoPlayer.addEventListener('change', formExtend)

    let muteButton = document.getElementById('mute-button')
    muteButton.addEventListener('click', muteToggle)

    let rulesButton = document.getElementById('rules-button')
    rulesButton.addEventListener('click', rulesPopup)

    let resetConfirm = document.getElementById('reset-confirm')
    resetConfirm.addEventListener('click', () => {
        resetGame()
        resetConfirmClose()
    });

}

function rulesPopup() {
    let rulesModal = document.getElementById("rules-container");
    rulesModal.style.display = "block"
    rulesClose(rulesModal)
}

function rulesClose(rulesModal) {
    let closeButton = document.getElementsByClassName("close")[0];

    closeButton.onclick = function() {
    rulesModal.style.display = "none";
  }
  
     window.onclick = function(event) {
    if (event.target == rulesModal) {
      rulesModal.style.display = "none";
    }
  }
}

function colorPopup() {
    let colorModal = document.getElementById("color-alert-container");
    colorModal.style.display = "block"
    colorClose(colorModal)
}

function colorClose(colorModal) {
    let closeButton = document.getElementsByClassName("close")[1];

    closeButton.onclick = function() {
    colorModal.style.display = "none";
  }
     window.onclick = function(event) {
    if (event.target == colorModal) {
      colorModal.style.display = "none";
    }
  }
}

function resetPopup() {
    let resetModal = document.getElementById("reset-alert-container");
    resetModal.style.display = "block"
    resetClose(resetModal)
}

function resetClose(resetModal) {
    let closeButton = document.getElementsByClassName("close")[2];
    let cancelButton = document.getElementById('reset-cancel')

    closeButton.onclick = function() {
    resetModal.style.display = "none";
  }
    cancelButton.onclick = function() {
    resetModal.style.display = "none";
  }
     window.onclick = function(event) {
    if (event.target == resetModal) {
        resetModal.style.display = "none";
    }
  }
}

function resetConfirmClose () {
    let resetModal = document.getElementById("reset-alert-container");
    resetModal.style.display = "none";
}

function audioPlay() {
    let backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.paused) { //check audio is playing
        backgroundMusic.play();
    }
}

function muteToggle() {
    let backgroundMusic = document.getElementById('background-music');
    let rollSound = document.getElementById('roll-sound')
    let ladderSound = document.getElementById('ladder-sound')
    let snakeSound = document.getElementById('snake-sound')
    let winSound = document.getElementById('win-sound')
    if (backgroundMusic.muted != true) {
        backgroundMusic.muted = true;
        rollSound.muted = true;
        ladderSound.muted = true;
        snakeSound.muted = true;
        winSound.muted = true;
        document.getElementById('mute-button').innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
    } else {
        backgroundMusic.muted = false;
        rollSound.muted = false;
        ladderSound.muted = false;
        snakeSound.muted = false;
        winSound.muted = false;
        document.getElementById('mute-button').innerHTML = `<i class="fa-solid fa-volume-high"></i>`
    }
}

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
                        
    `
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
    `
    }
}

function gameSetup() {
    let players = document.getElementById('players').value
    let colorOne = document.getElementById('color-one').value
    if (document.getElementById('color-two')) {
        let colorTwo = document.getElementById('color-two').value

        let pieceTwo = document.getElementById('piece-two')
        pieceTwo.style.backgroundColor = colorTwo

        let pieceTwoSmooth = document.getElementById('piece-two-smooth')
        pieceTwoSmooth.style.backgroundColor = colorTwo
    } else {}
    let pieceOne = document.getElementById('piece-one')
    pieceOne.style.backgroundColor = colorOne

    let pieceOneSmooth = document.getElementById('piece-one-smooth')
    pieceOneSmooth.style.backgroundColor = colorOne

    if (players == 2) {
        colorChecker(players)
    } else {
        let computerPiece = document.getElementById('piece-two')
        computerPiece.style.backgroundColor = 'grey'
        let pieceTwoSmooth = document.getElementById('piece-two-smooth')
        pieceTwoSmooth.style.backgroundColor = 'grey'
        document.getElementById('robot-icon').style.color = 'black'
        runGame(players)
    }
}

function colorChecker(players) {
    let colorOne = document.getElementById('color-one').value
    let colorTwo = document.getElementById('color-two').value
    if (colorOne == colorTwo) {
        // alert('Please choose different color, You might not know who is who!')
        colorPopup()
    } else {
        runGame(players)
    }
}


function runGame(players) {
    let gameRunning = true

    document.getElementById('rules-button-container').innerHTML = ``

    document.getElementById('roll-container').innerHTML =
        `
    <button id="dice-roller">Roll</button>
    `
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
    `
    document.getElementById('dice-result-container').innerHTML =
        `
    <div id="result-one">
            <p></p>
        </div>
        <div id="result-two">
            <p></p>
        </div>
    `

    let diceRoller = document.getElementById('dice-roller')

    diceRoller.addEventListener('click', rollDice)

    document.getElementById('form-container').innerHTML =
        ``
    document.getElementById('form-container').style.padding = 0

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
        `
    } else {
        document.getElementById('reset-mute-container').innerHTML =
            `
        <div id="reset-container">
            <button id="reset-button">Reset Game</button>
        </div>
        <div id="mute-container">
            <button id="mute-button"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>
        `
    }

    let resetButton = document.getElementById('reset-button')
    resetButton.addEventListener('click', resetPopup)

    let muteButton = document.getElementById('mute-button')
    muteButton.addEventListener('click', muteToggle)

    // sound effects
    let rollSound = document.getElementById('roll-sound')
    let ladderSound = document.getElementById('ladder-sound')
    let snakeSound = document.getElementById('snake-sound')
    let winSound = document.getElementById('win-sound')

    let turn = Math.floor(Math.random() * 2) + 1

    if (players == 2) {
        document.getElementById('game-messages').innerText = (`Player ${turn} goes first`)
        if (turn == 1) {
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
        } else {
            document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
        }
    } else {
        if (turn == 1) {
            document.getElementById('game-messages').innerText = (`You go first!`)
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
        } else {
            if (gameRunning === true) {
                document.getElementById('game-messages').innerText = ('Computer goes first')
                disableButtons()
                document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
                diceNum = Math.floor(Math.random() * 6) + 1
                setTimeout(function () {
                    movePieceTwo(diceNum)
                    if (diceNum == 1) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-one"></i>`}
                    else if (diceNum == 2) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-two"></i>`}
                    else if (diceNum == 3) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-three"></i>`}
                    else if (diceNum == 4) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-four"></i>`}
                    else if (diceNum == 5) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-five"></i>`}
                    else if (diceNum == 6) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-six"></i>`}
                    

                }, 500);
            }
        }
    }



    function rollDice() {

        rollSound.play();

        let diceNum = Math.floor(Math.random() * 6) + 1
        // let diceNum = 1
        disableButtons()

        let dice = document.querySelector('.dice');

        dice.style.animation = 'rolling 2.5s';

        document.getElementById('result-two').innerText = ``

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
                    movePieceOne(diceNum)
                } else {
                    movePieceTwo(diceNum)
                }
            } else {
                if (turn == 1) {
                    movePieceOne(diceNum)
                    diceNum = Math.floor(Math.random() * 6) + 1

                    setTimeout(function () {
                        if (gameRunning === true) {
                            movePieceTwo(diceNum)
                            if (diceNum == 1) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-one"></i>`}
                            else if (diceNum == 2) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-two"></i>`}
                            else if (diceNum == 3) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-three"></i>`}
                            else if (diceNum == 4) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-four"></i>`}
                            else if (diceNum == 5) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-five"></i>`}
                            else if (diceNum == 6) {document.getElementById('result-two').innerHTML = `The computer rolled a ${diceNum}  <i class="fa-solid fa-dice-six"></i>`}
                        }
                    }, 1500);
                }
            }
        }, 1500);
    }

    function switchTurn() {
        if (gameRunning === true) {
            if (turn == 1) {
                turn = turn + 1
                if (players == 2) {
                    document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`
                    document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
                    enableButtons()


                } else {
                    document.getElementById('game-messages').innerText = `Computer's Turn`
                    document.getElementById('game-messages').style.color = 'grey'

                }

            } else {
                turn = turn - 1
                if (players == 2) {
                    document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`
                    document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
                    enableButtons()
                } else {
                    document.getElementById('game-messages').innerText = `Your Turn!`
                    document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
                    enableButtons()
                }

            }
        }
    }

    function movePieceOne(diceNum) {
        console.log('movepieceOne ran')
        let pieceOne = document.getElementById('piece-one')
        if (parseInt(pieceOne.style.gridRowStart) === 1 && parseInt(pieceOne.style.gridColumnStart) <= 7) {
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum == 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
                winSound.play();
                gameRunning = false
                setTimeout(function () {
                    if (players == 2) {
                        alert('Player 1 Wins!')
                        resetGame()
                    } else {
                        alert('You Win!')
                        resetGame()
                    }
                }, 700);


            } else if (parseInt(pieceOne.style.gridColumnStart) - diceNum > 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
            }
        } else if (pieceOne.style.gridRowStart % 2 === 0) {
            let PositionEvenOne = pieceOne.style.gridColumnStart
            let magicNumEvenOne = 11 - PositionEvenOne
            pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + diceNum
            if (pieceOne.style.gridColumnStart > 10) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - 10
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
                console.log(PositionEvenOne)
                console.log(magicNumEvenOne)
                let modifierEvenOne = diceNum - magicNumEvenOne
                console.log(modifierEvenOne)
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + modifierEvenOne
    
                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) + 1
                    updatePieceOneSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                    updatePieceOneSmooth()
                    console.log('second update ran')
                }, 400);

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - modifierEvenOne
                    updatePieceOneSmooth()
                    console.log('third update ran')
                }, 700);
            }
            
        } else if (pieceOne.style.gridRowStart % 2 != 0) {
            let positionOddOne = pieceOne.style.gridColumnStart
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum < 0) {
                console.log(positionOddOne)
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + 10
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
                let modifierOddOne = diceNum - positionOddOne
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - modifierOddOne

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) + 1
                    updatePieceOneSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                    updatePieceOneSmooth()
                    console.log('second update ran')
                }, 400);

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + modifierOddOne
                    updatePieceOneSmooth()
                    console.log('third update ran')
                }, 700);


            } else if (pieceOne.style.gridColumnStart == 1 && diceNum == 1) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
            } else if (pieceOne.style.gridColumnStart - diceNum == 0) {

                setTimeout(function () {
                    pieceOne.style.gridColumnStart = 1
                    updatePieceOneSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                    updatePieceOneSmooth()
                    console.log('second update ran')
                }, 400);   
            } else {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
            }
        }

        updatePieceOneSmooth()
        setTimeout(function () {
            specialCheckOne(pieceOne)
        }, 1000);

    }

    function specialCheckOne(pieceOne) {
        console.log('special check One ran')
        if (pieceOne.style.gridColumnStart == 4 && pieceOne.style.gridRowStart == 10) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 5
            pieceOne.style.gridRowStart = 8
        } else if (pieceOne.style.gridColumnStart == 1 && pieceOne.style.gridRowStart == 8) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 7
        } else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 8) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 7
            pieceOne.style.gridRowStart = 3
        } else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 8) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 7
            pieceOne.style.gridRowStart = 10
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 6) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 5
            pieceOne.style.gridRowStart = 3
        } else if (pieceOne.style.gridColumnStart == 7 && pieceOne.style.gridRowStart == 6) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 9
        } else if (pieceOne.style.gridColumnStart == 5 && pieceOne.style.gridRowStart == 5) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 9
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 4) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 1
            pieceOne.style.gridRowStart = 3
        } else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 3) {
            ladderSound.play();
            pieceOne.style.gridColumnStart = 9
            pieceOne.style.gridRowStart = 2
        } else if (pieceOne.style.gridColumnStart == 8 && pieceOne.style.gridRowStart == 3) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 10
            pieceOne.style.gridRowStart = 5
        } else if (pieceOne.style.gridColumnStart == 2 && pieceOne.style.gridRowStart == 2) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 6
        } else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 1) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 3
        } else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 1) {
            snakeSound.play();
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 5
        }
        updatePieceOneSmooth()

        if (gameRunning === true) {
            switchTurn()
        }
    }

    function movePieceTwo(diceNum) {
        let pieceTwo = document.getElementById('piece-two')
        if (parseInt(pieceTwo.style.gridRowStart) === 1 && parseInt(pieceTwo.style.gridColumnStart) <= 7) {
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum == 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
                if (players == 2) {
                    winSound.play();
                    gameRunning = false
                    setTimeout(function () {
                        alert('Player 2 Wins!')
                        resetGame()
                    }, 700);
                } else {
                    gameRunning = false
                    setTimeout(function () {
                        alert('Computer Wins')
                        resetGame()
                    }, 700);

                }
            } else if (parseInt(pieceTwo.style.gridColumnStart) - diceNum > 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
            }
        } else if (pieceTwo.style.gridRowStart % 2 === 0) {
            let PositionEvenTwo = pieceTwo.style.gridColumnStart
            let magicNumEvenTwo = 11 - PositionEvenTwo
            pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + diceNum
            if (pieceTwo.style.gridColumnStart > 10) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - 10
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart)
                console.log(PositionEvenTwo)
                console.log(magicNumEvenTwo)
                let modifierEvenTwo = diceNum - magicNumEvenTwo
                console.log(modifierEvenTwo)
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + modifierEvenTwo
    
                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) + 1
                    updatePieceTwoSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                    updatePieceTwoSmooth()
                    console.log('second update ran')
                }, 400);

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - modifierEvenTwo
                    updatePieceTwoSmooth()
                    console.log('third update ran')
                }, 700);
            }



        } else if (pieceTwo.style.gridRowStart % 2 != 0) {
            let positionOddTwo = pieceTwo.style.gridColumnStart
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum < 0) {
                console.log(positionOddTwo)
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + 10
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart)
                let modifierOddTwo = diceNum - positionOddTwo
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - modifierOddTwo

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) + 1
                    updatePieceTwoSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                    updatePieceTwoSmooth()
                    console.log('second update ran')
                }, 400);

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + modifierOddTwo
                    updatePieceTwoSmooth()
                    console.log('third update ran')
                }, 700);


            } else if (pieceTwo.style.gridColumnStart == 1 && diceNum == 1) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
            } else if (pieceTwo.style.gridColumnStart - diceNum == 0) {

                setTimeout(function () {
                    pieceTwo.style.gridColumnStart = 1
                    updatePieceTwoSmooth()
                    console.log('first update ran')
                }, 0);

                setTimeout(function () {
                    pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                    updatePieceTwoSmooth()
                    console.log('second update ran')
                }, 400);   
            } else {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
            }
        }

        updatePieceTwoSmooth()
        setTimeout(function () {
            specialCheckTwo(pieceTwo)
        }, 1000);
    }

    function specialCheckTwo(pieceTwo) {

        if (pieceTwo.style.gridColumnStart == 4 && pieceTwo.style.gridRowStart == 10) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 5
            pieceTwo.style.gridRowStart = 8
        } else if (pieceTwo.style.gridColumnStart == 1 && pieceTwo.style.gridRowStart == 8) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 7
        } else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 8) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 7
            pieceTwo.style.gridRowStart = 3
        } else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 8) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 7
            pieceTwo.style.gridRowStart = 10
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 6) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 5
            pieceTwo.style.gridRowStart = 3
        } else if (pieceTwo.style.gridColumnStart == 7 && pieceTwo.style.gridRowStart == 6) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6
            pieceTwo.style.gridRowStart = 9
        } else if (pieceTwo.style.gridColumnStart == 5 && pieceTwo.style.gridRowStart == 5) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 9
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 4) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 1
            pieceTwo.style.gridRowStart = 3
        } else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 3) {
            ladderSound.play();
            pieceTwo.style.gridColumnStart = 9
            pieceTwo.style.gridRowStart = 2
        } else if (pieceTwo.style.gridColumnStart == 8 && pieceTwo.style.gridRowStart == 3) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 10
            pieceTwo.style.gridRowStart = 5
        } else if (pieceTwo.style.gridColumnStart == 2 && pieceTwo.style.gridRowStart == 2) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 6
        } else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 1) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6
            pieceTwo.style.gridRowStart = 3
        } else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 1) {
            snakeSound.play();
            pieceTwo.style.gridColumnStart = 6
            pieceTwo.style.gridRowStart = 5
        }
        updatePieceTwoSmooth()
        switchTurn()
    }
}

function updatePieceOneSmooth() {
    let pieceOneSmooth = document.getElementById('piece-one-smooth')
    let element = document.getElementById("piece-one");
    let leftPosition = element.offsetLeft;
    let topPosition = element.offsetTop

    let leftPositionCorrected = leftPosition - 0
    let topPositionCorrected = topPosition - 0

    pieceOneSmooth.style.left = `${leftPositionCorrected}px`
    pieceOneSmooth.style.top = `${topPositionCorrected}px`
}

function updatePieceTwoSmooth() {
    let pieceTwoSmooth = document.getElementById('piece-two-smooth')
    let element = document.getElementById("piece-two");
    let leftPosition = element.offsetLeft;
    let topPosition = element.offsetTop

    let leftPositionCorrected = leftPosition - 0
    let topPositionCorrected = topPosition - 0

    pieceTwoSmooth.style.left = `${leftPositionCorrected}px`
    pieceTwoSmooth.style.top = `${topPositionCorrected}px`
}

// function resetConfirm() {
//     if (confirm("Reset the game?") == true) {
//         resetGame()
//     } else {}
// }

function resetGame() {
    gameRunning = false

    let backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.muted != true) {
        document.getElementById('rules-button-container').innerHTML = `<button id="rules-button">How To Play</button>`
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
    `
    } else {
        document.getElementById('rules-button-container').innerHTML = `<button id="rules-button">How To Play</button>`
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
    `
    }

    document.getElementById('roll-container').innerHTML = ``
    document.getElementById('dice-container').innerHTML = ``
    document.getElementById('reset-mute-container').innerHTML = ``
    document.getElementById('game-messages').innerHTML = ``
    document.getElementById('result-two').innerText = ``
    document.getElementById('robot-icon').style.color = 'transparent'
    setTimeout(function () {
        document.getElementById('result-two').innerText = ``
    }, 2000);

    pageSetup()
    updatePieceOneSmooth()
    updatePieceTwoSmooth()
}


//button disable

function disableButtons() {

    document.getElementById("dice-roller").disabled = true;
    document.getElementById("reset-button").disabled = true;
}

function enableButtons() {

    document.getElementById("dice-roller").disabled = false;
    document.getElementById("reset-button").disabled = false;
}

// modal stuff

// // Get the modal
// var modal = document.getElementById("rules-container");

// // Get the button that opens the modal
// var btn = document.getElementById("rules-button");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
//   console.log('button clicked')
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }