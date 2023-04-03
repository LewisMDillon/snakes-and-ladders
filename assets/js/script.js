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
    }
    else {}
    let pieceOne = document.getElementById('piece-one')
    pieceOne.style.backgroundColor = colorOne

    if (players == 2) {
        console.log('we were routed to the colorChecker function')
        colorChecker(players)
    }
    else {
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
    document.getElementById('dice-container').innerHTML = 
    `
    <button id="dice-roller">Roll</button>
        <div id="dice-result">
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
        console.log(`Player ${turn} goes first`)
    }
    else {
        if (turn == 1) {
            console.log(`You go first`)
        }
        else {
            console.log('Computer goes first')
        }
    }



    function rollDice() {
        let diceNum = Math.floor(Math.random() * 6) + 1
        // let diceNum = 1
        document.getElementById('dice-result').innerText = diceNum
        if (players == 2) {
            console.log('there are 2 plyurs')
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
                }, 500);
            }
        }
        
        
        
    }

    function switchTurn() {
        if (turn == 1) {
            turn = turn + 1
        }
        else {
            turn = turn - 1
        }
    }
    
    function movePieceOne(diceNum) {
        let pieceOne = document.getElementById('piece-one')
        if (parseInt(pieceOne.style.gridRowStart) === 1 && parseInt(pieceOne.style.gridColumnStart) <=7) {
            console.log('winstopper function ran')
            if (parseInt(pieceOne.style.gridColumnStart) - diceNum == 1) {
                pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
                alert('Player 1 Wins!')
            }
            else if (parseInt(pieceOne.style.gridColumnStart) - diceNum == 3) {
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
        specialCheckOne(pieceOne)
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
        switchTurn()
    }

    function movePieceTwo(diceNum) {
        let pieceTwo = document.getElementById('piece-two')
        if (parseInt(pieceTwo.style.gridRowStart) === 1 && parseInt(pieceTwo.style.gridColumnStart) <=7) {
            console.log('winstopper function ran')
            if (parseInt(pieceTwo.style.gridColumnStart) - diceNum == 1) {
                pieceTwo.style.gridColumnStart = parseInt(pieceTwo.style.gridColumnStart) - diceNum
                alert('Player 2 Wins!')
            }
            else if (parseInt(pieceTwo.style.gridColumnStart) - diceNum == 3) {
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
        specialCheckTwo(pieceTwo)
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
        switchTurn()
    }
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
    document.getElementById('dice-container').innerHTML = ``
    document.getElementById('reset-container').innerHTML = ``
    pageSetup()
    
}
