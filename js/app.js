/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2  
// 3  |  4  |  5
// 6  |  7  |  8


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 3, 6], // rows
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2], // columns 
  [3, 4, 6],
  [6, 7, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
]

console.log(winningCombos)

/*---------------------------- Variables (state) ----------------------------*/

let board 
let turn 
let winner

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

const messageEl = document.getElementById('message')

/*----------------------------- Event Listeners -----------------------------*/

squareEls[0].addEventListener('click', handleClick)
squareEls[1].addEventListener('click', handleClick)
squareEls[2].addEventListener('click', handleClick)
squareEls[3].addEventListener('click', handleClick)
squareEls[4].addEventListener('click', handleClick)
squareEls[5].addEventListener('click', handleClick)
squareEls[6].addEventListener('click', handleClick)
squareEls[7].addEventListener('click', handleClick)
squareEls[8].addEventListener('click', handleClick)

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  turn = 0
  player = null
  render()
}

function render() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      console.log(`null`)
      squareEls[i].className = 'default'
    } else if (board[i] === 0) {
      console.log(`Zero`)
      squareEls[i].className = 'red'
    } else if (board[i] === 1) {
      console.log(`One`)
      squareEls[i].className = 'blue'
    }
  }
}

function handleClick(evt) {
  evt = evt.target
  if (evt.className === 'default' && turn === 0) {
    evt.className = 'red'
    messageEl.textContent = `It is blue's turn`
    turn = 1
    console.log(evt.id)
  } else if (evt.className === 'default' && turn === 1) {
    evt.className = 'blue'
    turn = 0
    messageEl.textContent = `It is red's turn`
  } else if (evt.className !== 'red' && turn === 0) {
    evt.className = 'red'
    turn = 1
  } else if (evt.className !== 'blue' && turn === 1) {
    evt.className = 'blue'
    turn = 0
  }
}

init()



