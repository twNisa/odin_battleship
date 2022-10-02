import Gameboard from "./Gameboard"

export default class Player{
  constructor(name,isAI){
    this.name = name
    this.isAI = isAI
    this.gameBoard = new Gameboard()
    this.alreadyHit = false
    this.shipHit = []
  }
  attack(row, col, gameBoard){
    if(!gameBoard.board[row][col].isShot){
      gameBoard.receiveAttack(row,col);
    } else{
      return
    }
    !this.alreadyHit
  }
  randomAttack(gameBoard){
    console.log("making random attack")
   
      let row = Math.floor(Math.random() * 10)
      let col = Math.floor(Math.random() * 10)
      while(gameBoard.board[row][col].isShot){
        row = Math.floor(Math.random() * 10)
        col = Math.floor(Math.random() * 10) 
      }
      gameBoard.receiveAttack(row,col);
      if(gameBoard.board[row][col].hasShip){
        console.log("ai attacked a ship")
        this.shipHit.push({
          "coord" : [row, col],
          ship: gameBoard.board[row][col].hasShip
        })
      }
    
    
    
    return {
      "row": row,
      "col": col
    }
    !this.alreadyHit
  }
  reset(){
    this.gameBoard = new Gameboard()
    this.alreadyHit = false
    this.shipHit = []
  }
}