/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2  
// 3  |  4  |  5
// 6  |  7  |  8

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

const squareEls = [ // Is there a cleaner way to store this? 
  sq0 = document.getElementById('sq0'), 
  sq1 = document.getElementById('sq1'), 
  sq2 = document.getElementById('sq2'), 
  sq3 = document.getElementById('sq3'), 
  sq4 = document.getElementById('sq4'), 
  sq5 = document.getElementById('sq5'), 
  sq6 = document.getElementById('sq6'), 
  sq7 = document.getElementById('sq7'), 
  sq8 = document.getElementById('sq8')  
]

const messageEl = document.getElementById('message')

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => square.addEventListener(`click`, handleClick))

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  player = null
  render()
}

function handleClick({ target: { id } }) {
  if (!winner) {
    const sqIdx = ~~id.slice(2) // => 0 / 1 / 2...
    if (board[sqIdx] !== null) return 
    board[sqIdx] = turn // board[sqIdx] === 1 or -1 
    turn *= -1 // 1 = O || -1 = X //
    getWinner()
    render()
  } 
}


function getWinner() {
  winningCombos.forEach((combo) => {
    let sum = board[combo[0]] + board[combo[1]] + board[combo[2]]
    if (sum === 3) winner = turn
    if (sum === -3) winner = turn
    if (!board.includes(null)) winner = 'T'      
  })
}


function render() {
  boardRender()
  winnerText()
    // if (winner === 'T') {
    // return messageEl.textContent = `It's a tie!`
    // } else if (winner === 1) {
    // return messageEl.textContent = `Blue takes the game!`
    // } else if (winner === -1) {
    // return messageEl.textContent = `Red takes the game!`
    // } 
}

function boardRender() {
  board.forEach((space, idx) => {
    space = board[idx]
    square = squareEls[idx]
    msg = messageEl
    if (space === null) {
      square.className = 'default'
      square.textContent = ''
    } else if (space === 1) {
      square.className = 'red'
      square.textContent = 'O'
      msg.textContent = `It's Blue's turn!`
    } else if (space === -1) {
      square.className = 'blue'
      square.textContent = 'X'
      msg.textContent = `It's Red's turn!`
    }
  })
}  

function assignContent() {
  board.forEach((space, idx) => {
    space = board[idx]
    square = squareEls[idx]
    msg = messageEl.textContent
    if (space === null) {
      square.className = 'default'
      square.textContent = ''
    } else if (space === 1) {
      square.className = 'red'
      square.textContent = 'O'
      msg = `It's Blue's Turn!`
    } else if (space === -1) {
      square.className = 'blue'
      square.textContent = 'X'
      msg = `It's Red's Turn!`
    }
  })
}

function winnerText() {
  if (winner === 'T') {
    return messageEl.textContent = `It's a tie!`
    } else if (winner === 1) {
    return messageEl.textContent = `Blue takes the game!`
    } else if (winner === -1) {
    return messageEl.textContent = `Red takes the game!`
    } 
}





init()



