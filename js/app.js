/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2
// 3  |  4  |  5
// 6  |  7  |  8

/*-------------------------------- Constants --------------------------------*/

// Represents the board space combinations that equal a win
const winningCombos = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

// each square cached
const squareEls = [
  (sq0 = document.getElementById('sq0')),
  (sq1 = document.getElementById('sq1')),
  (sq2 = document.getElementById('sq2')),
  (sq3 = document.getElementById('sq3')),
  (sq4 = document.getElementById('sq4')),
  (sq5 = document.getElementById('sq5')),
  (sq6 = document.getElementById('sq6')),
  (sq7 = document.getElementById('sq7')),
  (sq8 = document.getElementById('sq8')),
]

const oMsg = document.getElementById('message-left')
const xMsg = document.getElementById('message-right')
const winMsg = document.getElementById('win-message')
const tLeft = document.getElementById('t-text-left')
const tRight = document.getElementById('t-text-right')
const resetBtn = document.getElementById('reset-button')

/*----------------------------- Event Listeners -----------------------------*/

// on click of a square the handleClick function will be executed
squareEls.forEach((square) => square.addEventListener(`click`, handleClick))

// reset state but track wins
resetBtn.addEventListener(`click`, reset)

/*-------------------------------- Functions --------------------------------*/

// initializes the board setting the turn to 1 and the spaces to null
function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  // O is 1 // X is -1 //
  render()
}

function handleClick({ target: { id } }) {
  if (!winner) {
    const sqIdx = parseInt(id.slice(2)) 
    if (board[sqIdx] !== null) return
    board[sqIdx] = turn
    turn *= -1 
    checkWinner()
    render()
  }
}

function checkWinner() {
  winningCombos.forEach((combo) => {
    let sum = board[combo[0]] + board[combo[1]] + board[combo[2]]
    if (sum === 3) {
      winner = turn
    } else if (sum === -3) {
      winner = turn
    }
  })
  if (!board.includes(null) && winner !== turn) {
    winner = 'T'
  }
}

function render() {
  boardRender()
  winnerText()
}

function boardRender() {
  board.forEach((element, idx) => {
    let sq = squareEls[idx]
    sq.classList.add('default')
    sq.textContent = ''
    if (element === 1) {
      sq.classList.add('oh', 'o-ease-in')
      sq.textContent = 'O'
    } else if (element === -1) {
      sq.classList.add('ex', 'x-ease-in')
      sq.textContent = 'X'
    }
  })
  if (turn === 1) {
    oMsg.classList.remove('deactive')
    oMsg.classList.add('o-active')
    xMsg.classList.add('deactive')
  }
  if (turn === -1) {
    xMsg.classList.remove('deactive')
    xMsg.classList.add('x-active')
    oMsg.classList.add('deactive')
  }
}

function winnerText() {
  if (winner === -1) {
    oWins()
    tLeft.classList.add(`l-tally`)
    tLeft.append('|')
  }
  if (winner === 1) {
    xWins()
    tRight.classList.add(`r-tally`)
    tRight.append('|')
  }
  if (winner === 'T') {
    winMsg.textContent = `Draw`
    winMsg.classList.add(`tie`)
    resetBtn.classList.remove(`invisible`)
    resetBtn.classList.add(`visible`)
  }
}

function reset() {
  board.forEach((element, idx) => {
    let sq = squareEls[idx]
    sq.classList.remove(`oh`, `o-ease-in`, `ex`, `x-ease-in`, `default`)
  })
  resetBtn.classList.remove(`visible`)
  resetBtn.classList.add(`invisible`)
  winMsg.classList.remove(`o-win-msg`, `x-win-msg`, `tie`)
  tLeft.classList.remove(`l-tally`)
  tRight.classList.remove(`r-tally`)
  winner = null
  winMsg.textContent = ''
  init()
}

function oWins() {
  winMsg.style.color = '#8BF9C7'
  winMsg.classList.add('o-win-msg')
  winMsg.textContent = `O wins`
  oMsg.classList.remove(`deactive`)
  xMsg.classList.add(`deactive`)
  resetBtn.classList.remove(`invisible`)
  resetBtn.classList.add(`visible`)
}

function xWins() {
  winMsg.style.color = '#fcbfb7ff'
  winMsg.classList.add('x-win-msg')
  winMsg.textContent = `X wins`
  xMsg.classList.remove(`deactive`)
  oMsg.classList.add(`deactive`)
  resetBtn.classList.remove(`invisible`)
  resetBtn.classList.add(`visible`)
}

init()