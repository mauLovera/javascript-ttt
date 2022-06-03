/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2  
// 3  |  4  |  5
// 6  |  7  |  8

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2], // rows 
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
]


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


squareEls.forEach((element) => addEventListener(`click`, handleClick))
// squareEls[0].addEventListener('click', handleClick)
// squareEls[1].addEventListener('click', handleClick)
// squareEls[2].addEventListener('click', handleClick)
// squareEls[3].addEventListener('click', handleClick)
// squareEls[4].addEventListener('click', handleClick)
// squareEls[5].addEventListener('click', handleClick)
// squareEls[6].addEventListener('click', handleClick)
// squareEls[7].addEventListener('click', handleClick)
// squareEls[8].addEventListener('click', handleClick)

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
  turn = 1
  player = null
  render()
}

// this handles the click functionality of the board and updates the value of the board array
function handleClick(evt) {
  if (!winner) {
      // variable will hold the index of the div within the squareEL array which is the same length as the board array so it works
    const sqIdx = parseInt(evt.target.id.slice(2)) // => 0 / 1 / 2... 
    if (board[sqIdx] !== null) {
      return 
    } 
    // need to assign sqIdx to board 
    board[sqIdx] = turn // board[0] === 1 or -1 
    turn *= -1 
    // console.log(board[sqIdx], board)
    getWinner()
    render()
  } 
}

function getWinner() {
    winningCombos.forEach((combo) => {
      // find the sum of the values within the board array at indices 0, 1, and 2 of the combo
      let sum = board[combo[0]] + board[combo[1]] + board[combo[2]]
      // if the absolute value of the sum is 3, there's a winner
      if (sum === 3) {
        winner = turn
        return console.log(`Red has won`)
      } else if (sum === -3) {
        winner = turn
        return console.log(`Blue has won`)
      } else if (!board.includes(null)) {
        winner = 'T'
      }
        // because you're tracking the turn, you can determine the winner using that variable, which is all you need to return        
    })
    return winner
}

// this updates the style of the board depending on the values found within the board array in init()
function render() {
  board.forEach((element, index) => {
    if (board[index] === null) {
      squareEls[index].className = 'default'
      squareEls[index].textContent = ''
      // console.log(board[index])
    } else if (board[index] === 1) {
      squareEls[index].className = 'red'
      squareEls[index].textContent = 'O'
      messageEl.textContent = `It's Blue's turn!`
      // console.log(board[index]
    } else if (board[index] === -1) {
      squareEls[index].className = 'blue'
      squareEls[index].textContent = 'X'
      messageEl.textContent = `It's Red's turn!`
    }
  })
    if (winner === 'T') {
    return messageEl.textContent = `It's a tie!`
    } else if (winner === 1) {
    return messageEl.textContent = `Blue takes the game!`
    } else if (winner === -1) {
    return messageEl.textContent = `Red takes the game!`
    } 
}

init()



