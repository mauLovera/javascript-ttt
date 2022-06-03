/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2  
// 3  |  4  |  5
// 6  |  7  |  8

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

const squareEls = [  
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

const msgEl = document.getElementById('message')

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => square.addEventListener(`click`, handleClick))

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  player = null
  // O is 1 // X is -1 //
  render()
}

function handleClick({ target: { id } }) {
  console.log(`%cTurn: ${turn}`, `color: pink`)
  if (!winner) {
    const sqIdx = parseInt(id.slice(2)) // => 0 / 1 / 2...
    if (board[sqIdx] !== null) return 
    board[sqIdx] = turn // board[sqIdx] = 1 or -1 
    turn *= -1 // 1 = O || -1 = X //
    checkWinner()
    render()
  } 
  // console.log(`%cAfter turn: ${turn}`, `color: cyan`)
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
    sq.className = 'default'
    sq.textContent = ''
    if (element === 1) {
      sq.className = 'red'
      sq.textContent = 'O'
    } else if (element === -1) {
      sq.className = 'blue'
      sq.textContent = 'X'
    }
  })
  msgEl.textContent = turn === 1 ? `It's Red's turn!` : `It's Blue's Turn!`
}  

function winnerText() {
  if (winner === 1) msgEl.textContent = `Blue takes the game!`
  if (winner === -1) msgEl.textContent = `Red takes the game!`
  if (winner === 'T') msgEl.textContent = `It's a tie!`
}

init()