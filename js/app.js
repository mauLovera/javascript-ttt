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

}



