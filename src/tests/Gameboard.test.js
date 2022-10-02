import Gameboard from "./Gameboard"
import Ship from "./Ship"
describe("gameboard functions testing", ()=>{
  let testCarrier;
  let testDestroyer;
  let gameBoard;
  let testBoardArray = [];
  let testHitArray = [];

  beforeEach(()=>{
    testCarrier = new Ship("Carrier", 4 )
    testDestroyer = new Ship("Destroyer", 3)
    gameBoard = new Gameboard();
    for(let i =0; i<10; i++){
      testBoardArray[i] = [];
      for(let j=0; j<10; j++){
        testBoardArray[i][j]={hasShip:false, isShot:false}
      }
    }
  })
  test("placement adjacent", ()=>{
    gameBoard.placeShip(testCarrier, 1, 1, false);
    expect(gameBoard.isPlacementPossible(testDestroyer, 1, 1, true)).toEqual(false)
  })

  describe("testing placement possiblity", ()=>{
    test("init", ()=>{
      expect(gameBoard.board).toEqual(testBoardArray)
    })
  
    test("placement horizontal possible", ()=>{
      
      expect(gameBoard.isPlacementPossible(testCarrier, 1, 2, false)).toEqual(true);
    })
    test("placement horizontal NOT possible", ()=>{
      
      expect(gameBoard.isPlacementPossible(testCarrier, 9, 2, false)).toEqual(false);
    })
    test("placement vertical possible", ()=>{
      
      expect(gameBoard.isPlacementPossible(testCarrier, 1, 2, true)).toEqual(true);
    })
    test("placement vertical NOT possible", ()=>{
      
      expect(gameBoard.isPlacementPossible(testCarrier, 1, 6, true)).toEqual(false);
    })

  })


  describe("test placing carrier on board", ()=>{
    test("place carrier", ()=>{
      gameBoard.placeShip(testCarrier, 1, 2, false);
      testBoardArray[1][2].hasShip = testCarrier;
      testBoardArray[1][3].hasShip = testCarrier;
      testBoardArray[1][4].hasShip = testCarrier;
      testBoardArray[1][5].hasShip = testCarrier;
      expect(gameBoard.board).toEqual(
        testBoardArray
      )
    })
    test("place carrier vertical", ()=>{
      gameBoard.placeShip(testCarrier, 1, 2, true);
      testBoardArray[1][2].hasShip = testCarrier;
      testBoardArray[2][2].hasShip = testCarrier;
      testBoardArray[3][2].hasShip = testCarrier;
      testBoardArray[4][2].hasShip = testCarrier;
      expect(gameBoard.board).toEqual(
        testBoardArray
      )
    })
  })
  
  test("receieve attack", ()=>{
    gameBoard.placeShip(testCarrier, 2, 4, false);
    
    expect(gameBoard.receiveAttack(2,4)).toBe(true);
  })
  test("receieve attack", ()=>{
    gameBoard.placeShip(testCarrier, 2, 4, false);
    gameBoard.receiveAttack(2,3)
    expect(testCarrier.hits).toEqual([]);
  })
  test("receieve attack twice", ()=>{
    gameBoard.placeShip(testCarrier, 2, 4, false);
    gameBoard.receiveAttack(2,4)
    gameBoard.receiveAttack(2,7)
    expect(testCarrier.hits).toEqual([[2,4],[2,7]]);
  })
  test("all sunk", ()=>{
    gameBoard.placeShip(testCarrier, 2, 4, false);
    gameBoard.placeShip(testDestroyer, 3, 4, true);
    gameBoard.receiveAttack(2,4)
    gameBoard.receiveAttack(2,5)
    gameBoard.receiveAttack(2,6)
    gameBoard.receiveAttack(2,7)

    gameBoard.receiveAttack(3,4)
    gameBoard.receiveAttack(4,4)
    gameBoard.receiveAttack(5,4)
    
    gameBoard.receiveAttack(6,4)
    expect(gameBoard.isAllSunk()).toEqual(true)
  })

})