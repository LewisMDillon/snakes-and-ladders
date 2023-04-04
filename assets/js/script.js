document.addEventListener("DOMContentLoaded", pageSetup())

function pageSetup() {
    document.getElementById('piece-one').style.gridColumnStart = "1";
    document.getElementById('piece-one').style.gridRowStart = "10";

    document.getElementById('piece-two').style.gridColumnStart = "1";
    document.getElementById('piece-two').style.gridRowStart = "10";

    let startButton = document.getElementById('start-button')
    startButton.addEventListener('click', gameSetup)

    let twoPlayer = document.getElementById('players')
    twoPlayer.addEventListener('change', formExtend)

    let testButton = document.getElementById('test-button')

    console.log('pageSetup ran')    
}

function testFunction() {
    console.log('testFunction ran')
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
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
            </select>
            <label for="color-two">Player Two</label>
            <select id="color-two" name="color-two">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
            </select>
        </div>
                        
    `
    }
    else {
        document.getElementById('color-container').innerHTML = 
    `
        <div id="color-container">
            <p>Pick your color!</p>
            <label for="color-one">Player One</label>
            <select id="color-one" name="color-one">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
            </select>
        </div>
    `
    }
    console.log('formExtend ran')
}

function gameSetup() {
    let players = document.getElementById('players').value
    let colorOne = document.getElementById('color-one').value
    console.log(`A ${players}-player game`)
    console.log(`Player one is ${colorOne}`)
    if (document.getElementById('color-two')) {
        let colorTwo = document.getElementById('color-two').value
        console.log(`Player two is ${colorTwo}`)

        let pieceTwo = document.getElementById('piece-two')
            pieceTwo.style.backgroundColor = colorTwo

        let pieceTwoSmooth = document.getElementById('piece-two-smooth')
        pieceTwoSmooth.style.backgroundColor = colorTwo
    }
    else {}
    let pieceOne = document.getElementById('piece-one')
    pieceOne.style.backgroundColor = colorOne

    let pieceOneSmooth = document.getElementById('piece-one-smooth')
    pieceOneSmooth.style.backgroundColor = colorOne

    if (players == 2) {
        console.log('we were routed to the colorChecker function')
        colorChecker(players)
    }
    else {
        let computerPiece = document.getElementById('piece-two')
        computerPiece.style.backgroundColor = 'grey'
        let pieceTwoSmooth = document.getElementById('piece-two-smooth')
        pieceTwoSmooth.style.backgroundColor = 'grey'
        document.getElementById('robot-icon').style.fontSize = '22px'
        runGame(players)
        console.log('the game started without colorChecker')
    }
}

function colorChecker(players) {
    let colorOne = document.getElementById('color-one').value
    let colorTwo = document.getElementById('color-two').value
    if (colorOne == colorTwo) {
            alert('Please choose different color, You might not know who is who!')
            console.log('the colorChecker comparison returned true')
        }
    else {
            console.log('the game started via colorChecker')
            runGame(players)
    }
}


function runGame(players) {
    document.getElementById('roll-container').innerHTML = 
    `
    <button id="dice-roller">Roll</button>
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
    document.getElementById('reset-container').innerHTML = 
    `<button id="reset-button">Reset Game</button>`

    let resetButton = document.getElementById('reset-button')
    resetButton.addEventListener('click', resetConfirm)

    let turn = Math.floor(Math.random() * 2) + 1
    
    console.log(`the value of the players variable is: ${players}`)

    if (players == 2) {
        document.getElementById('game-messages').innerText = (`Player ${turn} goes first`)
        if (turn == 1) {
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
        }
        else {
            document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
        }
    }
    else {
        if (turn == 1) {
            document.getElementById('game-messages').innerText = (`You go first!`)
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
        }
        else {
            document.getElementById('game-messages').innerText = ('Computer goes first')
            document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
            diceNum = Math.floor(Math.random() * 6) + 1
                setTimeout(function(){
                    movePieceTwo(diceNum)
                    document.getElementById('result-two').innerText = `The computer rolled a ${diceNum}`
                }, 500);
        }
    }



    function rollDice() {
        let diceNum = Math.floor(Math.random() * 6) + 1
        // let diceNum = 1
        document.getElementById('result-one').innerText = diceNum

        let dice = document.querySelector('.dice');
        
        dice.style.animation = 'rolling 2.5s';
        
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
        
        setTimeout(function(){
            if (players == 2) {
                if (turn == 1) {
                    movePieceOne(diceNum)
                }
                else {
                    movePieceTwo(diceNum)
                }
            }
            else {
                if (turn == 1) {
                    movePieceOne(diceNum)
                    diceNum = Math.floor(Math.random() * 6) + 1

                    setTimeout(function(){
                        movePieceTwo(diceNum)
                        document.getElementById('result-two').innerText = `The computer rolled a ${diceNum}`
                    }, 1500);
                }
            }
        }, 1500);  
    }

    function switchTurn() {
        if (turn == 1) {
            turn = turn + 1
            if (players == 2) {
                document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`
                document.getElementById('game-messages').style.color = document.getElementById('piece-two').style.backgroundColor
                

            }
            else {
                document.getElementById('game-messages').innerText = `Computer's Turn`
                document.getElementById('game-messages').style.color = 'grey'
            }
            
        }
        else {
            turn = turn - 1
            document.getElementById('game-messages').innerText = `Player ${turn}'s Turn`
            document.getElementById('game-messages').style.color = document.getElementById('piece-one').style.backgroundColor
        }
    }
    
    function movePieceOne(diceNum) {
        let pieceOne = document.getElementById('piece-one')
        if (parseInt(pieceOne.style.gridRowStart) === 1 && parseInt(pieceOne.style.gridColumnStart) <=7) {
            console.log('winstopper function ran')
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum == 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
                setTimeout(function(){
                    alert('Player 1 Wins!')
                }, 700);
            }
            else if (parseInt(pieceOne.style.gridColumnStart) - diceNum > 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
            }
        }
        else if (pieceOne.style.gridRowStart % 2 === 0) {
            pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + diceNum
            if (pieceOne.style.gridColumnStart > 10) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - 10
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
                console.log('even carryover function ran')
            }
        }
        else if (pieceOne.style.gridRowStart % 2 != 0) {
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum < 0) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + 10
                pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
                console.log('odd carryover function ran')        
            }
            else if (pieceOne.style.gridColumnStart == 1 && diceNum == 1) {
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                console.log('dice 1 function ran')
            }
            else if (pieceOne.style.gridColumnStart - diceNum == 0) {
                pieceOne.style.gridColumnStart = 1
                pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
                console.log('zero function ran')
            }
             else {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
             }   
        }
        updatePieceOneSmooth()
        setTimeout(function(){
            specialCheckOne(pieceOne)
        }, 500);

        
    }
    
    function specialCheckOne(pieceOne) {
        if (pieceOne.style.gridColumnStart == 4 && pieceOne.style.gridRowStart == 10) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 5
            pieceOne.style.gridRowStart = 8
        }
        else if (pieceOne.style.gridColumnStart == 1 && pieceOne.style.gridRowStart == 8) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 7
        }
        else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 8) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 7
            pieceOne.style.gridRowStart = 3
        }
        else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 8) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 7
            pieceOne.style.gridRowStart = 10
        }
        else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 6) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 5
            pieceOne.style.gridRowStart = 3
        }
        else if (pieceOne.style.gridColumnStart == 7 && pieceOne.style.gridRowStart == 6) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 9
        }
        else if (pieceOne.style.gridColumnStart == 5 && pieceOne.style.gridRowStart == 5) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 9
        }
        else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 4) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 1
            pieceOne.style.gridRowStart = 3
        }
        else if (pieceOne.style.gridColumnStart == 10 && pieceOne.style.gridRowStart == 3) {
            console.log('you climbed a ladder')
            pieceOne.style.gridColumnStart = 9
            pieceOne.style.gridRowStart = 2
        }
        else if (pieceOne.style.gridColumnStart == 8 && pieceOne.style.gridRowStart == 3) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 10
            pieceOne.style.gridRowStart = 5
        }
        else if (pieceOne.style.gridColumnStart == 2 && pieceOne.style.gridRowStart == 2) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 2
            pieceOne.style.gridRowStart = 6
        }
        else if (pieceOne.style.gridColumnStart == 9 && pieceOne.style.gridRowStart == 1) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 3
        }
        else if (pieceOne.style.gridColumnStart == 3 && pieceOne.style.gridRowStart == 1) {
            console.log('you slid down a snake')
            pieceOne.style.gridColumnStart = 6
            pieceOne.style.gridRowStart = 5
        }
        updatePieceOneSmooth()
        switchTurn()
    }

    function movePieceTwo(diceNum) {
        let pieceTwo = document.getElementById('piece-two')
        if (parseInt(pieceTwo.style.gridRowStart) === 1 && parseInt(pieceTwo.style.gridColumnStart) <=7) {
            console.log('winstopper function ran')
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum == 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
                if (players == 2) {
                    setTimeout(function(){
                        alert('Player 2 Wins!')
                    }, 700);
                }
                else {
                    setTimeout(function(){
                        alert('Computer Wins')
                    }, 700);
                }
            }
            else if (parseInt(pieceTwo.style.gridColumnStart) - diceNum > 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
            }
        }
        else if (pieceTwo.style.gridRowStart % 2 === 0) {
            pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + diceNum
            if (pieceTwo.style.gridColumnStart > 10) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - 10
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart)
                console.log('even carryover function ran')
            }
        }
        else if (pieceTwo.style.gridRowStart % 2 != 0) {
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum < 0) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) + 10
                pieceTwo.style.gridColumnStart = 11 - parseInt(pieceTwo.style.gridColumnStart)
                console.log('odd carryover function ran')        
            }
            else if (pieceTwo.style.gridColumnStart == 1 && diceNum == 1) {
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                console.log('dice 1 function ran')
            }
            else if (pieceTwo.style.gridColumnStart - diceNum == 0) {
                pieceTwo.style.gridColumnStart = 1
                pieceTwo.style.gridRowStart = parseInt(pieceTwo.style.gridRowStart) - 1
                console.log('zero function ran')
            }
             else {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
             }   
        }
        updatePieceTwoSmooth()
        setTimeout(function(){
            specialCheckTwo(pieceTwo)
        }, 500);
    }

    function specialCheckTwo(pieceTwo) {
        if (pieceTwo.style.gridColumnStart == 4 && pieceTwo.style.gridRowStart == 10) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 5
            pieceTwo.style.gridRowStart = 8
        }
        else if (pieceTwo.style.gridColumnStart == 1 && pieceTwo.style.gridRowStart == 8) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 7
        }
        else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 8) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 7
            pieceTwo.style.gridRowStart = 3
        }
        else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 8) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 7
            pieceTwo.style.gridRowStart = 10
        }
        else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 6) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 5
            pieceTwo.style.gridRowStart = 3
        }
        else if (pieceTwo.style.gridColumnStart == 7 && pieceTwo.style.gridRowStart == 6) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 6
            pieceTwo.style.gridRowStart = 9
        }
        else if (pieceTwo.style.gridColumnStart == 5 && pieceTwo.style.gridRowStart == 5) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 9
        }
        else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 4) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 1
            pieceTwo.style.gridRowStart = 3
        }
        else if (pieceTwo.style.gridColumnStart == 10 && pieceTwo.style.gridRowStart == 3) {
            console.log('you climbed a ladder')
            pieceTwo.style.gridColumnStart = 9
            pieceTwo.style.gridRowStart = 2
        }
        else if (pieceTwo.style.gridColumnStart == 8 && pieceTwo.style.gridRowStart == 3) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 10
            pieceTwo.style.gridRowStart = 5
        }
        else if (pieceTwo.style.gridColumnStart == 2 && pieceTwo.style.gridRowStart == 2) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 2
            pieceTwo.style.gridRowStart = 6
        }
        else if (pieceTwo.style.gridColumnStart == 9 && pieceTwo.style.gridRowStart == 1) {
            console.log('you slid down a snake')
            pieceTwo.style.gridColumnStart = 6
            pieceTwo.style.gridRowStart = 3
        }
        else if (pieceTwo.style.gridColumnStart == 3 && pieceTwo.style.gridRowStart == 1) {
            console.log('you slid down a snake')
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

function resetConfirm() {  
    if (confirm("Reset the game?") == true) {
        resetGame()
    } 
    else {}
}

function resetGame() {
    console.log('you reset the game')
    document.getElementById('form-container').innerHTML =
    ` <form class="form" action=>
                <div class="pageTitle title">Game Setup</div>
                <div class="secondaryTitle title"></div>
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
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
            </form>
            <div>
                <button id="start-button">Start Game!</button>
            </div>
    `
    document.getElementById('roll-container').innerHTML = ``
    document.getElementById('reset-container').innerHTML = ``

    pageSetup()
    updatePieceOneSmooth()
    updatePieceTwoSmooth()
}

