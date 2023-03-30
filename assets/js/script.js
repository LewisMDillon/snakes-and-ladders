document.addEventListener("DOMContentLoaded", gameSetup())

function gameSetup() {
    document.getElementById('piece-one').style.gridColumnStart = "1";
    document.getElementById('piece-one').style.gridRowStart = "10";
    let diceRoller = document.getElementById('dice-roller')
    diceRoller.addEventListener('click', rollDice)

}

function startGame() {

}

   

function rollDice() {
    let diceNum = Math.floor(Math.random() * 6) + 1
    document.getElementById('dice-result').innerText = diceNum
    movePiece(diceNum)

}

function movePiece(diceNum) {
    let pieceOne = document.getElementById('piece-one')

    if (parseInt(pieceOne.style.gridRowStart) === 1 && parseInt(pieceOne.style.gridColumnStart) <=7) {
        console.log('the function ran')
    }

    else if (pieceOne.style.gridRowStart % 2 === 0) {
        pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + diceNum
        if (pieceOne.style.gridColumnStart > 10) {
            pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
            pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - 10
            pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
        }
    }
    else if (pieceOne.style.gridRowStart % 2 != 0) {
        pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - diceNum
        if (pieceOne.style.gridColumnStart < 0) {
            pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
            pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + 10
            pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)        
        }
        else if (pieceOne.style.gridColumnStart == 1 && diceNum == 1) {
            pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
        } 
    }
    // else if (pieceOne.style.gridRowStart == 8) {
    //     pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) + diceNum
    //     if (pieceOne.style.gridColumnStart > 10) {
    //         pieceOne.style.gridRowStart = parseInt(pieceOne.style.gridRowStart) - 1
    //         pieceOne.style.gridColumnStart = parseInt(pieceOne.style.gridColumnStart) - 10
    //         pieceOne.style.gridColumnStart = 11 - parseInt(pieceOne.style.gridColumnStart)
    //     }
    // }
}

function resetGame() {

}
