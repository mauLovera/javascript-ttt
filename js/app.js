/*-------------------------------- Constants --------------------------------*/



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

squareEls[0].addEventListener('click', addValue)


/*-------------------------------- Functions --------------------------------*/

const init = () => {
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

const render = () => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      console.log(`null`)
    } else if (board[i] === 0) {
      console.log(`Zero`)
    } else if (board[i] === 1) {
      console.log(`One`)
    }
  }
}

function addValue(evt) {
  console.log(`square zero`)
  squareEls[0].className = 'red'
}

init()



