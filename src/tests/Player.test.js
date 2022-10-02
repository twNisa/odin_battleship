import Player from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("testing a game", ()=>{
  let testCarrier
  let testDestroyer
  let oneBoard
  let twoBoard
  let playerOne
  let playerTwo
  beforeEach(()=>{
    testCarrier = new Ship("Carrier", 4 )
    testDestroyer = new Ship("Destroyer", 3)
    playerOne = new Player("player one", false)
    playerTwo = new Player("player AI", true)
  })

  test("init player", ()=>{
    expect(playerOne).toEqual({
      name:"player one",
      isAI: false,
      alreadyHit: false,
      gameBoard: new Gameboard()
    })
  })
  
  test("attack and sink test", ()=>{
    playerOne.gameBoard.placeShip(testCarrier, 1, 1, false)
    playerTwo.gameBoard.placeShip(testDestroyer, 1, 2, true);
    playerOne.attack(1, 2, playerTwo.gameBoard)
    playerOne.attack(2, 2, playerTwo.gameBoard)
    playerOne.attack(3, 2, playerTwo.gameBoard)
    expect(playerTwo.gameBoard.isAllSunk()).toBe(true)
  })

  test("random attack", ()=>{
    playerOne.gameBoard.placeShip(testCarrier, 1, 1, false)
    playerTwo.gameBoard.placeShip(testDestroyer, 1, 2, true)
    playerOne.randomAttack(playerTwo.gameBoard);
    
    // console.log(playerTwo.gameBoard.missedAttacks);
    // console.log(playerTwo.gameBoard.ships[0].hits)
  })

})
