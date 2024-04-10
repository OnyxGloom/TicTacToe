

let topRow = ['topleft', 'topmiddle' , 'topright']
let middleRow = ['middleleft', 'middlemiddle', 'middleright']
let bottomRow = ['bottomleft', 'bottommiddle', 'bottomright']
let leftColumn = ['topleft', 'middleleft', 'bottomleft']
let middleColumn = ['topmiddle', 'middlemiddle', 'bottommiddle']
let rightColumn = ['topright', 'middleright', 'bottomright']
let diagTopBottom = ['topleft', 'middlemiddle', 'bottomright']
let diagBottomTop = ['bottomleft', 'middlemiddle', 'topright']

let aiPossibleMoves = ['topleft', 'topmiddle' , 'topright', 'middleleft', 'middlemiddle', 'middleright', 'bottomleft', 'bottommiddle', 'bottomright']



let playerOne = []
let playerTwo = []
let playerAi = []

chosenToken =''

gameStarted = false
pvpGame = 
gameTurn = 0
isWinner = false

gameSelect()





function gameSelect(){
    for (i=0;i<document.querySelectorAll(".btn").length;i++)
    document.querySelectorAll(".btn")[i].addEventListener("click", function(event){
        gameType = event.target.getAttribute('id');
            if (gameType === "pvp") {
                pvpGame = true
            } else if (gameType === "pve") {
                pvpGame = false
            }
        console.log(gameType)
        gameStarted = true
        gameLoop(pvpGame)
    }, {once:true})

}

/*This listens for clicks on the main game pages, then inputs the
 id as an arguement in the 'nextMove' function*/

function gameLoop (pvp) {
    for (i=0;i<document.querySelectorAll(".game_square").length;i++){
    document.querySelectorAll(".game_square")[i].addEventListener("click", function(event){
        clickedSquare = event.target.getAttribute('id');
        whichPlayer = choosePlayer(pvp)
        nextTurn(clickedSquare, whichPlayer)
        checkDraw(gameTurn, isWinner)
        console.log(playerOne)
        console.log(playerTwo)
        console.log(playerAi)
        console.log(gameTurn)
    
}, {once:true})
    }
}



function choosePlayer(pvp) {
    if (pvp && (gameTurn%2)===0 || !pvp && (gameTurn%2)===0){
        return playerOne
    } else if (pvp && (gameTurn%2)===1) {
        return playerTwo
    } else if (!pvp && (gameTurn%2)===1) {
        return playerAi
    } 
}

function nextTurn(chosenSquare, player) {
    if (!gameStarted){
        alert("PVE pr PVP?")
    }
    else if ((gameTurn%2)===1){
        playerMove(chosenSquare, player)
        gameTurn++
        insertToken(chosenSquare, 'naught')
    } else {
        playerMove(chosenSquare, player)
        gameTurn++
        insertToken(chosenSquare, 'cross')
    }
}


/*This function checks if the game has started then
 takes two inputs and adds the first input to the 
 second as an array. This array will keep track 
 of the chosen players moves.*/

function playerMove (chosenSquare, player) {
    if (gameStarted) {
        player.push(chosenSquare)
        checkWinner(player)
    } else {
        alert("Please pick a game type")
    }
}

    //This looks for the CSS id and inserts a random image
function insertToken (square, token){
    document.querySelector("#"+clickedSquare).innerHTML="<img src='./Assets/Tokens/"+token+numberGenerator(8)+".png'>"
}

/*This function takes the players array as an input,
 then checks all the winning arrays against the 
 players to see if its included, then returns true*/

function checkWinner (player) {
    if (
    topRow.every(i => player.includes(i)) ||
    middleRow.every(i => player.includes(i)) ||
    bottomRow.every(i => player.includes(i)) ||
    leftColumn.every(i => player.includes(i)) ||
    middleColumn.every(i => player.includes(i)) ||
    rightColumn.every(i => player.includes(i)) ||
    diagTopBottom.every(i => player.includes(i)) ||
    diagBottomTop.every(i => player.includes(i))
    )
    {
        if ((gameTurn%2)===1){
            document.querySelector("h1").textContent="O Is the Winner!"
        } else {
            document.querySelector("h1").textContent="X Is the Winner!"
        }
        isWinner = true
        gameStarted = false
        activateReset()
    }
}


function checkDraw (turn, winner) {
    if (turn===9 && winner===false) {
        document.querySelector("h1").textContent="Its a Draw!"
        gameStarted = false
    }
    activateReset()
}

function activateReset(){
    for (i=0;i<document.querySelectorAll(".reset").length;i++)
    document.querySelectorAll(".reset")[i].addEventListener("click", function(){
        restartGame()
    }, {every:true})
}

        //This is to clear all EventListeners apart from 'reset'
function clearEvents(){
        events = document.querySelector(".main_board")
        events.replaceWith(events.cloneNode(true))
        pe = document.querySelector(".game_type")
        pe.replaceWith(pe.cloneNode(true))
}


function restartGame () {
    playerOne = []
    playerTwo = []
    playerAi = []
    gameStarted = false
    gameTurn = 0
    isWinner = false
    for (i=0;i<document.querySelectorAll(".game_square").length;i++){
        document.querySelectorAll(".game_square")[i].innerHTML=""
    }
    document.querySelector("h1").textContent="New Game?"

    clearEvents()
    gameSelect()
}

// Offers a random number between 1 and the entered argument
function numberGenerator (topNumber) {
    return Math.ceil(Math.random()*topNumber)
}





// Best of 3, Best of 5
