document.addEventListener("DOMContentLoaded", pageSetup())

function pageSetup() {
    document.getElementById('piece-one').style.gridColumnStart = "1";
    document.getElementById('piece-one').style.gridRowStart = "10";

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

    colorChecker(colorOne)
}

function colorChecker(colorOne) {
    if (document.getElementById('color-two') && colorOne === document.getElementById('color-two')) {
        alert('Please choose different color, You might not know who is who!')
        }
    else {
        console.log('game started successfully')
        runGame(players)
    }
}

function runGame(players) {
    document.getElementById('dice-container').innerHTML = 
    `
    <button id="dice-roller">Roll</button>
        <div id="dice-result">
            <p>Dice</p>
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
        movePieceOne(diceNum)
    }

    function switchTurn() {
        console.log(`It was this player turn: ${turn}`)
        
        if (turn == 1) {
            turn = turn + 1
        }

        else {
            turn = turn - 1
        }
       
        console.log(`Now it is this player turn: ${turn}`)
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
        specialCheck(pieceOne)
    }
    
    function specialCheck(pieceOne) {
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
}



function resetConfirm() {  
    if (confirm("Reset the game?") == true) {
        resetGame()
    } 
    else {}
}

function resetGame() {
    console.log('you reset the game')
    
}
