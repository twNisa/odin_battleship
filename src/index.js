
import Ship from "./factory/Ship"
import Player from "./factory/Player"
import "./styles.css"

const planning = document.querySelector(".planning")
const planningBoard = document.querySelector(".planning-board")
const planningRotateBtn = document.querySelector(".planning-rotate-btn")
const planningText = document.querySelector(".planning > p")
const planningStartGameBtn = document.querySelector(".planning-start-btn")
const planningResetBtn = document.querySelector(".planning-reset-btn")
const planningRandomBtn = document.querySelector(".planning-random-btn")

const playerBoard = document.querySelector(".player-board")
const aiBoard = document.querySelector(".enemy-board")
const boards = document.querySelector(".boards")

const endGameDiv = document.querySelector(".end-game")
const overlay = document.querySelector(".overlay")
const newGameBtn = document.querySelector(".end-game button")

let carrierPlayer, destroyerPlayer, submarinePlayer, submarine2Player;
let carrierAI, destroyerAI, submarineAI, submarine2AI;


const player = new Player("player one", false);
const ai = new Player("AI", true);

let playerShipsArr;

let current = 0
let isVerticalSelection = true
let isPlanningDone = false


initPlanning() 

function initPlanning(){ 
  planning.style.display="flex"

  planningBoard.textContent=""
  overlay.classList.add("active")
  planningRotateBtn.addEventListener("click", handleRotateBtnClick)

 
  carrierPlayer = new Ship("carrier", 4);
  destroyerPlayer = new Ship("destroyer", 3);
  submarinePlayer = new Ship("submarine", 2);
  submarine2Player = new Ship("submarine", 2);

  playerShipsArr = [carrierPlayer, destroyerPlayer, submarinePlayer, submarine2Player]
  

  planningText.textContent = `Place your ${playerShipsArr[current].type}`
  
  for(let i =0; i<10; i++){
    for(let j = 0; j<10; j++){
      const cell = document.createElement("div");
      cell.className = "cell"
      cell.dataset.row = i
      cell.dataset.col = j
      planningBoard.append(cell)
      cell.addEventListener("mouseover", (e)=> handleShipPlacementMouseOver(planningBoard, e))
      cell.addEventListener("click", handleShipPlacementClick)
    }
  }
  planningBoard.addEventListener("mouseleave",()=>{
    for (const cell of planningBoard.children) {
      if(cell.classList.contains("hovering")){
        cell.classList.remove("hovering")
      }
    }
  })
  planningStartGameBtn.addEventListener("click", handleGameStartClick)
  planningResetBtn.addEventListener("click", handleResetClick)
  // planningRandomBtn.addEventListener("click", handleRandomClick)
}

function stopPlanning(){
  current = 0
  isPlanningDone= false
  overlay.classList.toggle("active")
  planning.style.display="none"
}

function handleRotateBtnClick(){
  isVerticalSelection = !isVerticalSelection 
}

function handleShipPlacementMouseOver(planningBoard, e){
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  for (const cell of planningBoard.children) {
    if(cell.classList.contains("hovering")){
      cell.classList.remove("hovering")
    }
  }
 
  if(!player.gameBoard.isPlacementPossible(playerShipsArr[current], row, col, isVerticalSelection)){
    e.target.style.cursor="not-allowed"
  } else{
    if(isVerticalSelection){
      for(let i =0; i<playerShipsArr[current].length; i++){
        planningBoard.children[(row*10+col)+i*10].classList.toggle("hovering")
      }
    } else {
      for(let i =0; i<playerShipsArr[current].length; i++){
        planningBoard.children[(row*10+col)+i*1].classList.toggle("hovering")
      }
    }
  }
}

function handleShipPlacementClick(e){
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  
  if(player.gameBoard.isPlacementPossible(playerShipsArr[current], row, col, isVerticalSelection)){
    player.gameBoard.placeShip(playerShipsArr[current], row, col, isVerticalSelection)
    if(isVerticalSelection){
      for(let i =0; i<playerShipsArr[current].length; i++){
        planningBoard.children[(row*10+col)+i*10].classList.toggle("has-ship")
      }
    } else {
      for(let i =0; i<playerShipsArr[current].length; i++){
        planningBoard.children[(row*10+col)+i*1].classList.toggle("has-ship")
      }
    }


    if (current < playerShipsArr.length-1){
      current++
      planningText.textContent = `Place your ${playerShipsArr[current].type}`
    } else {
      //finished placing all ships
      console.log("finished placing all ships")
      planningText.textContent = "Placement done."

      // Array.from(planningBoard.children).map((cell) => cell.removeEventListener("mouseover", handleShipPlacementMouseOver))

      togglePlanningActive()
    }
  }
}

function togglePlanningActive(){
  isPlanningDone = !isPlanningDone
  for (const cell of planningBoard.children) {
    if(isPlanningDone){
      cell.style.cursor="not-allowed"
      cell.removeEventListener("click", handleShipPlacementClick)
      // cell.removeEventListener("mouseover", handleShipPlacementMouseOver)
    } else{
      cell.style.cursor="crosshair"
    }
  }
}
function handleGameStartClick(){
  if(isPlanningDone){
    stopPlanning()
    createRandomAIFleet()
    renderBoard(boards, player, ai)
  } else{
    console.log("not going to start")
  }
}
function handleResetClick(){
  current = 0;
  player.reset()
  isPlanningDone = false
  initPlanning()
}

// function handleRandomClick(){

// }
let isPlayerTurn = true;
let gameInProgress = false;

function renderBoard(div, player, ai){ 
  clearBoard();

  //for player board
  for(let i =0; i<10; i++){
    for(let j = 0; j<10; j++){
      const cell = document.createElement("div");
      cell.className = "cell"
      cell.dataset.row = i
      cell.dataset.col = j
      playerBoard.append(cell)
      cell.style.cursor = "not-allowed"
      player.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot") 
      player.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship")
    }
  }
  //for ai board
  for(let i =0; i<10; i++){
    for(let j = 0; j<10; j++){
      const cell = document.createElement("div");
      cell.className = "cell"
      cell.dataset.row = i
      cell.dataset.col = j
      aiBoard.append(cell)
      cell.style.cursor = "crosshair"
      cell.addEventListener("click", handleClick)
      // ai.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot") 
      // ai.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship")
    }
  }
}
function createRandomAIFleet(){
  carrierAI = new Ship("carrier", 4);
  destroyerAI = new Ship("destroyer", 3);
  submarineAI = new Ship("submarine", 2);
  submarine2AI = new Ship("submarine", 2);

  randomiseShip(carrierAI, ai)
  randomiseShip(destroyerAI, ai)
  randomiseShip(submarineAI, ai)
  randomiseShip(submarine2AI, ai)
}

function randomiseShip(ship, owner){
  let row = Math.floor(Math.random() * 10)
  let col = Math.floor(Math.random() * 10)
  let ver = Math.floor(Math.random() * 2)
  while(!owner.gameBoard.isPlacementPossible(ship, row, col, ver)){
    row = Math.floor(Math.random() * 10)
    col = Math.floor(Math.random() * 10)
    ver = Math.floor(Math.random() * 2)

  }
  owner.gameBoard.placeShip(ship, row, col, ver)
}

function handleClick(e){
  const row = e.target.dataset.row
  const col = e.target.dataset.col

  if(ai.gameBoard.receiveAttack(row, col) && !e.target.classList.contains("is-shot")){
    // ai.gameBoard.receiveAttack(row, col);
    e.target.dataset.isShot = true
    e.target.classList.toggle("is-shot")
    e.target.style.cursor = "not-allowed"
    if(ai.gameBoard.board[row][col].hasShip){
      e.target.classList.toggle("ship-shot")
      e.target.classList.toggle("has-ship")
    }
    if(ai.gameBoard.isAllSunk()){
      console.log("player won")
      endGame(player.name)
    }

    ai.randomAttack(player.gameBoard)
    if(player.gameBoard.isAllSunk()){
      console.log("ai won")
      endGame(ai.name)
    }
    updatePlayerBoard(player.gameBoard.board);
  } 

  e.target.removeEventListener("click", handleClick)
}

function updatePlayerBoard(board){
  playerBoard.textContent = ""
  for(let i =0; i<10; i++){
    for(let j = 0; j<10; j++){
      const cell = document.createElement("div");
      cell.className = "cell"
      cell.dataset.row = i
      cell.dataset.col = j
      playerBoard.append(cell)
      cell.style.cursor = "not-allowed"
      player.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot") 
      player.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship")
    }
  }
}

function endGame(name){
  console.log(`End Game ${name}`)
  document.querySelector(".game-over-text").textContent=`${name} won!`

  endGameDiv.classList.toggle("active")
  overlay.classList.toggle("active")
  newGameBtn.addEventListener("click", resetGame);
}

function clearBoard(){
  console.log("clear board")
  playerBoard.textContent = ""
  aiBoard.textContent = ""
}

function resetGame(){
  console.log("reset");
  player.reset()
  ai.reset()
  renderBoard(boards, player, ai)
  endGameDiv.classList.remove("active")
  overlay.classList.remove("active")
  initPlanning()
}
