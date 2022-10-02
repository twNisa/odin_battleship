import Ship from "./Ship";
const SIZE = 10;
export default class Gameboard{
  constructor(){
    this.board = []
    for(let i =0; i<SIZE; i++){
      this.board[i] = []
      for(let j=0; j<SIZE; j++){
        this.board[i][j] = {hasShip:false, isShot:false}
      }
    }
    this.missedAttacks = []
    this.ships = [];
  }

  receiveAttack(row, col){
    if(row < 0 || col < 0 || row > SIZE || col > SIZE){
      // pos is outside board 
      return false;
    }
    this.board[row][col].isShot = true;
    if(this.board[row][col].hasShip){
      this.board[row][col].hasShip.hit([row,col]) 
      return true
    } else{
      this.missedAttacks.push([row, col])
      return true
    }
  }

  isAllSunk(){
    return this.ships.every(ship => ship.isSunk())
  }
  

  placeShip(ship, row, col, isVertical){
    if (!this.isPlacementPossible(ship, row, col, isVertical)){
      return false;
    }
    // placement possible. we place ships on board
    if(isVertical){
      for(let i = row; i < row+ship.length; i++){
        this.board[i][col].hasShip = ship;
      }
    } else {
      for(let i = col; i < col+ship.length; i++){
        this.board[row][i].hasShip = ship;
      }
    }
    this.ships.push(ship);
    return true;
  }

  isPlacementPossible(ship, row, col, isVertical){
    // if placement is outside the grid
    if(row < 0 || row > SIZE -1 || col < 0 || col > SIZE-1){
      return false;
    } 
    // if vertical, y + length should be inside board
    if(isVertical && row + ship.length > SIZE-1){
      return false;
    }
    // if not vertical, x + length should be inside board
     else if(!isVertical && col + ship.length > SIZE-1){
      return false;
    }
    // if there is a cell in the ship's path that is already taken
    
    if(isVertical){
      for(let i = row; i < row+ship.length; i++){
        if(this.board[i][col].hasShip){
          return false;
        }
      }
    } else{
      for(let i = col; i < col+ship.length; i++){
        if(this.board[row][i].hasShip ){
          return false;
        }
      }
    }

    return true
  }


}