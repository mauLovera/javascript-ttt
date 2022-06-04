/*-------------------------------- Game Board -------------------------------*/

// 0  |  1  |  2  
// 3  |  4  |  5
// 6  |  7  |  8

/*-------------------------------- Constants --------------------------------*/

// Represents the board space combinations that equal a win 
const winningCombos = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

// each square cached
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

// the turn/win message cached
const oMsg = document.getElementById('message-left')
const xMsg = document.getElementById('message-right')
const winMsg = document.getElementById('win-message')

/*----------------------------- Event Listeners -----------------------------*/

// on click of a square the handleClick function will be executed
squareEls.forEach((square) => square.addEventListener(`click`, handleClick))

/*-------------------------------- Functions --------------------------------*/

// initializes the board setting the turn to 1 and the spaces to null
function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  // O is 1 // X is -1 //
  render()
}

/** 1. If there is no winner yet - extract the squares id on click
 * 2. Convert the index of the square to a variable // ex: sq0 = 0
 * 3. If the value of the board array at the squares index isn't null then return
 * 4. The value of the board element that corresponds to the square index is set to the current turn - either 1 (O) or -1 (X) 
 * 5. board = [1, null, null...]
 * 6. Flip the turn from 1 (O) to -1 (X) or vice versa
 * 7. call Check Winner ()
 *    1. For each element(combo) in winningCombos 
 *    2. Lets say O played space [0], [1], [3], [6]
 *    3. Lets say X played space [4], [2], [5]
 *    4. Assign sum to board(ex: 1)[combo[0](ex: 0)]
 *    5. This means that [1 or O] is assigned to the 0 space
 *    6. 
 *         O  |  O  |  X  |
 *         O  |  X  |  X  |
 *         O  |  n  |  n  |
 *         
 *         1  |  1   |  -1  | 
 *         1  |  -1  |  -1  |
 *         1  |  n   |  n   |
 *    7. the forEach loop will iterate over every possible winning
 *       combination every time something is clicked a value is
 *       assigned to a piece of board  
 *    7. 1[0] + 1[3] + 1[5] = 3
 *    8. winner (which is undefined) is now set to turn which is 
 *       either 1 / -1 or O / X 
 *    9. Since the turn is flipped before the win condition is 
 *       evaluated - a win for O is winner = -1
 *    10. A tie occurs when there are no spaces left that are null 
 *  8. Render is activated during every click which sets the 
 *     space to the color and letter of the corresponding value 
 *     within each element in the board array
 *    1. If the value is null
 *      1. style it white and set its text content to empty string 
 *    2. If the value of the element is 1 
 *      1. style it red and set its text content to O
 *    3. If the value of the element is -1 
 *      1. style it blue and set its text content to X
 *    4. if turn = 1 is true - say 'Its red's turn!' / if turn is 
 *       not equal to 1 then say 'It's blue's turn!'
 *    5. When winners value is set...
 *      1. If it is equal to 1 .. Blue has won
 *      2. If it is equal to -1 .. Red has won  
 * */

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
      // console.log(sum)
    } else if (sum === -3) {
      winner = turn
      // console.log(sum)
    }      
  }) 
  if (!board.includes(null) && winner !== turn) {
    winner = 'T'
    // console.log(winner !== turn)
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
  // oMsg.textContent = turn === 1 ? `O` : `X`
  // xMsg.textContent = turn === -1 ? `O` : `X`
}  

function winnerText() {
  if (winner === -1) {
    winMsg.textContent = `O wins`
    winMsg.classList.add('o-win-msg')
    oMsg.classList.remove(`deactive`)
    xMsg.classList.add(`deactive`)
  }
  if (winner === 1) {
    winMsg.textContent = `X wins`
    winMsg.classList.add('x-win-msg')
    xMsg.classList.remove(`deactive`)
    oMsg.classList.add(`deactive`)

  }
  if (winner === 'T') winMsg.textContent = `It's a tie!`
}

init()